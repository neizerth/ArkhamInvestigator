import { spawn } from "redux-saga/effects";
import { signatureEntitiesSaga } from "./base/entities/sagas";
import { signatureFeaturesSaga } from "./base/features/sagas";

export function* signatureSaga() {
	yield spawn(signatureEntitiesSaga);
	yield spawn(signatureFeaturesSaga);
}
