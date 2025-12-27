import { spawn } from "redux-saga/effects";
import { signatureBaseSaga } from "./base/sagas";
import { signatureImageCacheSaga } from "./signature-image-cache/sagas";
import { signatureSelectionSaga } from "./signature-selection/sagas";

export function* signatureSaga() {
	yield spawn(signatureBaseSaga);
	yield spawn(signatureImageCacheSaga);
	yield spawn(signatureSelectionSaga);
}
