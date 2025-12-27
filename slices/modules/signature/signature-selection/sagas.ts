import { spawn } from "redux-saga/effects";
import { selectionEntitiesSaga } from "./entities/sagas";

export function* signatureSelectionSaga() {
	yield spawn(selectionEntitiesSaga);
}
