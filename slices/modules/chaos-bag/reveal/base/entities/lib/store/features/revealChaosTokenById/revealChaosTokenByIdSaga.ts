import { selectBoardById } from "@modules/board/base/shared/lib";
import { unsealChaosToken } from "@modules/chaos-bag/base/entities/lib";
import {
	chaosBagUpdated,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/shared/lib";
import {
	addRevealedTokens,
	selectRevealedTokensCount,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { createRevealedToken } from "../../../logic";
import { chaosTokensRevealed } from "../revealChaosTokens";
import { startChaosBagReveal } from "../startReveal";
import { revealChaosTokenById } from "./revealChaosTokenById";

function* worker({ payload }: ReturnType<typeof revealChaosTokenById>) {
	const { id, boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const tokenSelector = selectChaosBagTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const valuesSelector = selectChaosBagTokenValues(boardId);

	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);
	const value = values[token.type];

	if (token.sealed) {
		yield put(unsealChaosToken(payload));
		yield put(chaosBagUpdated({ boardId }));
	}

	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	const revealedToken = createRevealedToken({
		...token,
		value,
	});

	const tokens = [revealedToken];

	if (count === 0) {
		yield put(
			startChaosBagReveal({
				...payload,
				tokens,
			}),
		);
	} else {
		yield put(addRevealedTokens({ tokens }));
		yield put(openChaosTokenRevealModal());
	}

	const { code } = board.investigator;

	yield put(
		chaosTokensRevealed({
			boardId,
			code,
			tokens,
		}),
	);
}

export function* revealChaosTokenByIdSaga() {
	yield takeEvery(revealChaosTokenById.match, worker);
}
