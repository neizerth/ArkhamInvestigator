import { spawn } from "redux-saga/effects";
import { initGameStatusOnMultiplayerRouteSaga } from "./init-game-status-on-multiplayer-route/initGameStatusOnMultiplayerRouteSaga";
import { joinLocalGameSaga } from "./join-local-game/joinLocalGameSaga";
import { resetChaosBagOnMultiplayerSaga } from "./reset-chaos-bag-on-multiplayer/resetChaosBagOnMultiplayerSaga";

export function* multiplayerFeaturesSaga() {
	yield spawn(joinLocalGameSaga);
	yield spawn(initGameStatusOnMultiplayerRouteSaga);
	yield spawn(resetChaosBagOnMultiplayerSaga);
}
