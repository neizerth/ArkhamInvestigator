import { fork } from "redux-saga/effects";
import { loadBoardOnBackgroundUpdateSaga } from "./loadBoardOnBackgroundUpdateSaga";
import { unloadBoardsAfterDescriptionShowChangedSaga } from "./unloadBoardsAfterDescriptionShowChangedSaga";

export function* loadBoardLibSaga() {
	yield fork(loadBoardOnBackgroundUpdateSaga);
	yield fork(unloadBoardsAfterDescriptionShowChangedSaga);
}
