import { spawn } from "redux-saga/effects";
import { soundBaseEntitiesSaga } from "./base/lib/store/sagas";

export function* soundEntitiesSaga() {
	yield spawn(soundBaseEntitiesSaga);
}
