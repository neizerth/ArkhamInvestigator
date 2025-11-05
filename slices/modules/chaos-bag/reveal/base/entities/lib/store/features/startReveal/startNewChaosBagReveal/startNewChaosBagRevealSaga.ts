import { selectBoardById } from "@modules/board/base/shared/lib";
import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { revealChaosTokens } from "../../revealChaosTokens";
import { startNewChaosBagReveal } from "./startNewChaosBagReveal";

function* worker({ payload }: ReturnType<typeof startNewChaosBagReveal>) {
	const { tokens = [] } = payload;
	const boardSelector = selectBoardById(payload.boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const boardId = board.id;
	const { turnId } = board;

	yield put(
		startChaosBagRevealInternal({
			...payload,
			boardId,
			turnId,
		}),
	);

	if (tokens.length > 0) {
		return;
	}

	yield put(
		revealChaosTokens({
			boardId,
			count: 1,
		}),
	);
}

export function* startNewChaosBagRevealSaga() {
	yield takeEvery(startNewChaosBagReveal.match, worker);
}
