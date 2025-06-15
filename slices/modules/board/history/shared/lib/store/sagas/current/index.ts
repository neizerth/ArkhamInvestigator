import { spawn } from "redux-saga/effects";
import { watchAddCurrentHistoryItemSaga } from "./addCurrentHistoryItemSaga";
import { watchClearCurrentHistorySaga } from "./clearClearCurrentHistorySaga";

export function* boardHistoryCurrentSaga() {
	yield spawn(watchAddCurrentHistoryItemSaga);
	yield spawn(watchClearCurrentHistorySaga);
}
