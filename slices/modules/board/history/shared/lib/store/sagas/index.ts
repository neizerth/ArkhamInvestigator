import { spawn } from "redux-saga/effects";
import { boardHistoryChangeSaga } from "./change";

import { changeBoardHistorySaga } from "./changeBoardHistorySaga";
import { boardHistoryItemSaga } from "./item";

export function* boardHistorySharedSaga() {
	yield spawn(boardHistoryChangeSaga);

	yield spawn(boardHistoryItemSaga);

	yield spawn(changeBoardHistorySaga);
}
