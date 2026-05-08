import { spawn } from "redux-saga/effects";
import { initGameStatusOnMultiplayerRouteSaga } from "./init-game-status-on-multiplayer-route/initGameStatusOnMultiplayerRouteSaga";
import { joinLocalGameSaga } from "./join-local-game/joinLocalGameSaga";
import { multiplayerNotificationSaga } from "./notification/sagas";
import { prepareMultiplayerOnStartSaga } from "./prepare-multiplayer-on-start/prepareMultiplayerOnStartSaga";
import { setBoardIndexOnMultiplayerSaga } from "./set-board-index-on-multiplayer/setBoardIndexOnMultiplayerSaga";

export function* multiplayerFeaturesSaga() {
	yield spawn(joinLocalGameSaga);
	yield spawn(initGameStatusOnMultiplayerRouteSaga);
	yield spawn(prepareMultiplayerOnStartSaga);
	yield spawn(multiplayerNotificationSaga);
	yield spawn(setBoardIndexOnMultiplayerSaga);
}
