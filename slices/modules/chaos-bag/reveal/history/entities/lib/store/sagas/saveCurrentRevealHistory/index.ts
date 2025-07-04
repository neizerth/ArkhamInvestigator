import { spawn } from "redux-saga/effects";
import { createCurrentRevealHistoryItemSaga } from "./createCurrentRevealHistoryItemSaga";
import { saveCurrentRevealHistoryItemSaga } from "./saveCurrentRevealHistoryItemSaga";
import { updateCurrentRevealHistoryItemSaga } from "./updateCurrentRevealHistoryItemSaga";

export function* saveCurrentRevealHistorySaga() {
	yield spawn(saveCurrentRevealHistoryItemSaga);
	yield spawn(createCurrentRevealHistoryItemSaga);
	yield spawn(updateCurrentRevealHistoryItemSaga);
}
