import { spawn } from "redux-saga/effects";
import { clearBoardOnNewGameSaga } from "./clear-board-on-new-game/clearBoardOnNewGameSaga";
import { leaveBoardSaga } from "./leave-board/leaveBoardSaga";
import { loadBoardSaga } from "./load-board/sagas";
import { setBoardSystemBarSaga } from "./set-board-system-bar/sagas";
import { unloadBoardsOnInitSaga } from "./unload-boards-on-init/unloadBoardsOnInitSaga";
import { updateBackgroundOnDescriptionUpdateSaga } from "./update-background-on-description-update/updateBoardBackgroundSaga";

export function* boardBaseFeaturesSaga() {
	yield spawn(leaveBoardSaga);
	yield spawn(updateBackgroundOnDescriptionUpdateSaga);
	yield spawn(setBoardSystemBarSaga);
	yield spawn(loadBoardSaga);
	yield spawn(unloadBoardsOnInitSaga);
	yield spawn(clearBoardOnNewGameSaga);
}
