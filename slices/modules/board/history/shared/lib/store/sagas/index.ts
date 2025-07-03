import { spawn } from "redux-saga/effects";
import { boardHistoryChangeSaga } from "./change";

import { boardHistoryItemSaga } from "./item";

export function* boardHistorySharedSaga() {
	yield spawn(boardHistoryChangeSaga);

	yield spawn(boardHistoryItemSaga);
}
