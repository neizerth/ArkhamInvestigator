import { spawn } from "redux-saga/effects";
import { leaveBoardSaga } from "./leave-board/leaveBoardSaga";
import { loadBoardSaga } from "./load-board/sagas";
import { setBoardSystemBarSaga } from "./set-board-system-bar/sagas";
import { updateBackgroundOnDescriptionUpdateSaga } from "./update-background-on-description-update/updateBoardBackgroundSaga";

export function* boardBaseFeaturesSaga() {
	yield spawn(leaveBoardSaga);
	yield spawn(updateBackgroundOnDescriptionUpdateSaga);
	yield spawn(setBoardSystemBarSaga);
	yield spawn(loadBoardSaga);
}
