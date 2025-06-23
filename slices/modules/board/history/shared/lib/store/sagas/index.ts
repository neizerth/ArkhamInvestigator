import { spawn } from "redux-saga/effects";
import { boardHistoryChangeSaga } from "./change";

import { clearBoardHistorySaga } from "./clearBoardHistorySaga";
import { boardHistoryItemSaga } from "./item";

export function* boardHistorySaga() {
	yield spawn(boardHistoryChangeSaga);

	yield spawn(clearBoardHistorySaga);

	yield spawn(boardHistoryItemSaga);
}
