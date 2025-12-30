import { spawn } from "redux-saga/effects";
import { gameEntitiesSaga } from "./entities/sagas";

export function* gameSaga() {
	yield spawn(gameEntitiesSaga);
}
