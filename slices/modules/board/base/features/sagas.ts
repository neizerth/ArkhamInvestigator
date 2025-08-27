import { spawn } from "redux-saga/effects";
import { leaveBoardSaga } from "./leave-board/leaveBoardSaga";
import { setBoardSystemBarSaga } from "./set-board-system-bar/sagas";
import { updateBoardImageSaga } from "./update-board-image/updateBoardImageSaga";

export function* boardBaseFeaturesSaga() {
	yield spawn(leaveBoardSaga);
	yield spawn(updateBoardImageSaga);
	yield spawn(setBoardSystemBarSaga);
}
