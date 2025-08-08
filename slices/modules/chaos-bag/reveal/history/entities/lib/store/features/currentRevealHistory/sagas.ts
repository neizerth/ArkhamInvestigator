import { spawn } from "redux-saga/effects";
import { createCurrentRevealHistoryItemSaga } from "./createCurrentRevealHistoryItem/createCurrentRevealHistoryItemSaga";
import { saveCurrentRevealHistoryItemSaga } from "./saveCurrentRevealHistoryItem/saveCurrentRevealHistoryItemSaga";
import { updateCurrentRevealHistoryItemSaga } from "./updateCurrentRevealHistoryItem/updateCurrentRevealHistoryItemSaga";

export function* saveCurrentRevealHistorySaga() {
	yield spawn(saveCurrentRevealHistoryItemSaga);
	yield spawn(createCurrentRevealHistoryItemSaga);
	yield spawn(updateCurrentRevealHistoryItemSaga);
}
