import { selectBoardId } from "@modules/board/base/shared/lib";
import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { revealChaosTokens } from "../../revealChaosTokens";
import { startNewChaosBagReveal } from "./startNewChaosBagReveal";

function* worker({ payload }: ReturnType<typeof startNewChaosBagReveal>) {
	const boardIdSelector = selectBoardId(payload.boardId);
	const boardId: ReturnType<typeof boardIdSelector> =
		yield select(boardIdSelector);

	yield put(
		startChaosBagRevealInternal({
			...payload,
			boardId,
		}),
	);

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
