import { spawn } from "redux-saga/effects";
import { signatureBaseEntitiesSaga } from "./entities/sagas";
import { signatureBaseFeaturesSaga } from "./features/sagas";

export function* signatureBaseSaga() {
	yield spawn(signatureBaseEntitiesSaga);
	yield spawn(signatureBaseFeaturesSaga);
}
