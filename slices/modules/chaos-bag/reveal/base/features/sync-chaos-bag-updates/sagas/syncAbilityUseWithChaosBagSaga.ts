import { boardAbilityUseSet } from "@modules/board/abilities/shared/lib";
import { selectCurrentBoardId } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { syncChaosBagContents } from "../syncChaosBagContents";

function* worker() {
	const boardId: ReturnType<typeof selectCurrentBoardId> =
		yield select(selectCurrentBoardId);

	yield put(
		syncChaosBagContents({
			boardId,
		}),
	);
}

export function* syncAbilityUseWithChaosBagSaga() {
	yield takeEvery(boardAbilityUseSet.match, worker);
}
