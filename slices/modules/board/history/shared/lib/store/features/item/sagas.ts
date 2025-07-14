import { spawn } from "redux-saga/effects";
import { addBoardHistoryItemSaga } from "./addBoardHistoryItem/addBoardHistoryItemSaga";
import { replaceBoardHistoryItemSaga } from "./replaceBoardHistoryItem/replaceBoardHistoryItemSaga";
import { updateBoardHistoryItemSaga } from "./updateBoardHistoryItem/updateBoardHistoryItemSaga";

export function* boardHistoryItemSaga() {
	yield spawn(addBoardHistoryItemSaga);
	yield spawn(replaceBoardHistoryItemSaga);
	yield spawn(updateBoardHistoryItemSaga);
}
