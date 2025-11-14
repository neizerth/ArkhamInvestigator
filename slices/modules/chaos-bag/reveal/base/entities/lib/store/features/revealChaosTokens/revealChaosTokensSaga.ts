import { selectBoardCode } from "@modules/board/base/shared/lib";
import { sealChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import { addRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { whereId } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanInterruptReveal } from "../../interupt";
import {
	selectCanRevealChaosTokens,
	selectRandomUnrevealedChaosTokens,
} from "../../selectors";
import {
	chaosTokensRevealed,
	revealChaosTokens,
	revealChaosTokensInterrupted,
} from "./revealChaosTokens";

function* worker({ payload }: ReturnType<typeof revealChaosTokens>) {
	const { count, boardId, force } = payload;

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

	const revealSelector = selectRandomUnrevealedChaosTokens({
		boardId,
		count,
	});

	const { tokens, contents }: ReturnType<typeof revealSelector> =
		yield select(revealSelector);

	const codeSelector = selectBoardCode(boardId);
	const code: ReturnType<typeof codeSelector> = yield select(codeSelector);

	for (const revealedToken of tokens) {
		const token = contents.find(whereId(revealedToken.id));

		if (token?.type !== "moon") {
			continue;
		}

		yield put(
			sealChaosToken({
				id: token.id,
				boardId,
			}),
		);
	}

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

	yield put(chaosBagUpdated(payload));
}

export function* revealChaosTokensSaga() {
	yield takeEvery(revealChaosTokens.match, worker);
}
