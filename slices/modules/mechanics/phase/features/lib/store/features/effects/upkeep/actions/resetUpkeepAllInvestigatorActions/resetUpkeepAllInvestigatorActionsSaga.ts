import { selectBoardIds } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { resetUpkeepInvestigatorActions } from "../resetUpkeepInvestigatorActions";
import { resetUpkeepAllInvestigatorActions } from "./resetUpkeepAllInvestigatorActions";

function* worker() {
	const boardIds: ReturnType<typeof selectBoardIds> =
		yield select(selectBoardIds);
	for (const boardId of boardIds) {
		yield put(
			resetUpkeepInvestigatorActions({
				boardId,
			}),
		);
	}
}

export function* resetUpkeepAllInvestigatorActionsSaga() {
	yield takeEvery(resetUpkeepAllInvestigatorActions.match, worker);
}
