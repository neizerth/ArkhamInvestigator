import { spawn } from "redux-saga/effects";
import { leaveBoardSaga } from "./leave-board/leaveBoardSaga";
import { updateBoardImageLayoutSaga } from "./update-board-image-layout/updateBoardLayoutSaga";

export function* boardBaseFeaturesSaga() {
	yield spawn(leaveBoardSaga);
	yield spawn(updateBoardImageLayoutSaga);
}
