import { spawn } from "redux-saga/effects";
import { clipboardEntitiesSaga } from "./entities/sagas";

export function* clipboardSaga() {
	yield spawn(clipboardEntitiesSaga);
}
