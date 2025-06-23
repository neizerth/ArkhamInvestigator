import { spawn } from "redux-saga/effects";
import { addBoardHistoryItemSaga } from "./addBoardHistoryItemSaga";
import { replaceBoardHistoryItemSaga } from "./replaceBoardHistoryItemSaga";
import { updateBoardHistoryItemSaga } from "./updateBoardHistoryItemSaga";

export function* boardHistoryItemSaga() {
	yield spawn(addBoardHistoryItemSaga);
	yield spawn(replaceBoardHistoryItemSaga);
	yield spawn(updateBoardHistoryItemSaga);
}
