import { spawn } from "redux-saga/effects";
import { signatureEntitiesSaga } from "./entities/sagas";
import { signatureFeaturesSaga } from "./features/sagas";

export function* signatureSaga() {
	yield spawn(signatureEntitiesSaga);
	yield spawn(signatureFeaturesSaga);
}
