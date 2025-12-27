import { spawn } from "redux-saga/effects";
import { selectionEntitiesSaga } from "./entities/sagas";

export function* selectionSaga() {
	yield spawn(selectionEntitiesSaga);
}
