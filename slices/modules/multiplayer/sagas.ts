import { spawn } from "redux-saga/effects";
import { multiplayerEntitiesSaga } from "./entities/sagas";
import { multiplayerFeaturesSaga } from "./features/sagas";

export function* multiplayerSaga() {
	yield spawn(multiplayerEntitiesSaga);
	yield spawn(multiplayerFeaturesSaga);
}
