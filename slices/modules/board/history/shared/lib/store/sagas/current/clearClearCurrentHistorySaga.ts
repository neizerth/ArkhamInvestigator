import { put, take } from "redux-saga/effects";
import { clearBoardHistory, clearCurrentHistory } from "../../actions";

export function* watchClearCurrentHistorySaga() {
	yield take(clearCurrentHistory.match);

	yield put(
		clearBoardHistory({
			boardId: "current",
		}),
	);
}
