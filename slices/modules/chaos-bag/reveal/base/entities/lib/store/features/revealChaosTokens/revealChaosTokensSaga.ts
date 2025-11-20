import { selectBoardCode } from "@modules/board/base/shared/lib";
import { unsealChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import { addRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanInterruptReveal } from "../../interupt";
import { selectCanRevealChaosTokens } from "../../selectors";
import {
	chaosTokensRevealed,
	revealChaosTokens,
	revealChaosTokensInterrupted,
} from "./revealChaosTokens";

function* worker({ payload }: ReturnType<typeof revealChaosTokens>) {
	const { tokens, boardId, force, unseal = true } = payload;

	const count = tokens.length;

	const validateSelector = selectCanRevealChaosTokens(count);
	const validation: ReturnType<typeof validateSelector> =
		yield select(validateSelector);

	if (!validation.canReveal) {
		return;
	}

	const canInterruptReveal: ReturnType<typeof selectCanInterruptReveal> =
		yield select(selectCanInterruptReveal);

	const canInterrupt = canInterruptReveal !== false && !force;

	if (canInterrupt) {
		const { codes } = canInterruptReveal;
		yield put(
			revealChaosTokensInterrupted({
				...payload,
				codes,
			}),
		);
		return;
	}

	const codeSelector = selectBoardCode(boardId);
	const code: ReturnType<typeof codeSelector> = yield select(codeSelector);

	yield put(
		addRevealedTokens({
			tokens,
		}),
	);

	yield put(
		chaosTokensRevealed({
			...payload,
			code,
			tokens,
		}),
	);

	if (!unseal) {
		yield put(chaosBagUpdated(payload));
		return;
	}

	for (const token of tokens) {
		if (token.sealed) {
			yield put(
				unsealChaosToken({
					...payload,
					id: token.id,
					returnToRevealModal: true,
				}),
			);
		}
	}
}

export function* revealChaosTokensSaga() {
	yield takeEvery(revealChaosTokens.match, worker);
}
