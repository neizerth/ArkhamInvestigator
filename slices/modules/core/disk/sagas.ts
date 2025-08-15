import { spawn } from "redux-saga/effects";
import { diskEntitySaga } from "./entities/sagas";

export function* diskSaga() {
	yield spawn(diskEntitySaga);
}
