import { spawn } from "redux-saga/effects";
import { signatureBaseSaga } from "./base/sagas";
import { signatureSelectionSaga } from "./selection/sagas";
import { signatureImageCacheSaga } from "./signature-image-cache/sagas";

export function* signatureSaga() {
	yield spawn(signatureBaseSaga);
	yield spawn(signatureImageCacheSaga);
	yield spawn(signatureSelectionSaga);
}
