import { spawn } from "redux-saga/effects";
import { selectionEntitiesSaga } from "./entities/sagas";
import { signatureSelectionFeaturesSagas } from "./features/sagas";

export function* signatureSelectionSaga() {
	yield spawn(selectionEntitiesSaga);
	yield spawn(signatureSelectionFeaturesSagas);
}
