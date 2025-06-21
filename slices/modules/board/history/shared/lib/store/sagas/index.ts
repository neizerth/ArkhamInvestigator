import { spawn } from "redux-saga/effects";
import { boardHistoryWatchChangeSaga } from "./change";

import { addBoardHistoryItemSaga } from "./addBoardHistoryItemSaga";
import { clearBoardHistorySaga } from "./clearBoardHistorySaga";
import { replaceBoardHistoryItemSaga } from "./replaceBoardHistoryItemSaga";

export function* boardHistorySaga() {
	yield spawn(boardHistoryWatchChangeSaga);

	yield spawn(addBoardHistoryItemSaga);
	yield spawn(replaceBoardHistoryItemSaga);
	yield spawn(clearBoardHistorySaga);
}
