import { spawn } from "redux-saga/effects";
import { signatureImageCacheEntitiesSaga } from "./entities/sagas";

export function* signatureImageCacheSaga() {
	yield spawn(signatureImageCacheEntitiesSaga);
}
