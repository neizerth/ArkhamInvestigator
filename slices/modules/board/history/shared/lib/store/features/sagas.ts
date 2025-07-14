import { spawn } from "redux-saga/effects";
import { changeBoardHistorySaga } from "./changeBoardHistory/changeBoardHistorySaga";
import { boardHistoryItemSaga } from "./item/sagas";
import { watchHistoryBoardChangesSaga } from "./watchBoardChanges";

export function* boardHistorySharedSaga() {
	yield spawn(watchHistoryBoardChangesSaga);

	yield spawn(boardHistoryItemSaga);

	yield spawn(changeBoardHistorySaga);
}
