import { spawn } from "redux-saga/effects";
import { multiplayerEntitiesSaga } from "./entities/sagas";

export function* multiplayerSaga() {
	yield spawn(multiplayerEntitiesSaga);
}
