import { spawn } from "redux-saga/effects";
import { boardHistoryWatchChangeSaga } from "./change";
import { boardHistoryCurrentSaga } from "./current";

import { watchAddBoardHistoryItemSaga } from "./addBoardHistoryItemSaga";
import { watchClearBoardHistorySaga } from "./clearBoardHistorySaga";

export function* boardHistorySaga() {
	yield spawn(boardHistoryWatchChangeSaga);
	yield spawn(boardHistoryCurrentSaga);

	yield spawn(watchAddBoardHistoryItemSaga);
	yield spawn(watchClearBoardHistorySaga);
}
