import { spawn } from "redux-saga/effects";
import { initGameStatusOnMultiplayerRouteSaga } from "./init-game-status-on-multiplayer-route/initGameStatusOnMultiplayerRouteSaga";
import { joinLocalGameSaga } from "./join-local-game/joinLocalGameSaga";

export function* multiplayerFeaturesSaga() {
	yield spawn(joinLocalGameSaga);
	yield spawn(initGameStatusOnMultiplayerRouteSaga);
}
