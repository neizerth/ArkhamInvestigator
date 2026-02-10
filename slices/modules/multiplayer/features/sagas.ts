import { spawn } from "redux-saga/effects";
import { joinLocalGameSaga } from "./join-local-game/joinLocalGameSaga";

export function* multiplayerFeaturesSaga() {
	yield spawn(joinLocalGameSaga);
}
