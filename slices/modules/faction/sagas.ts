import { spawn } from "redux-saga/effects";
import { factionEntitiesSaga } from "./entities/sagas";

export function* factionSaga() {
	yield spawn(factionEntitiesSaga);
}
