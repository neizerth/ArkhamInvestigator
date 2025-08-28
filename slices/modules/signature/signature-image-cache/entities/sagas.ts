import { spawn } from "redux-saga/effects";
import { createSignatureCacheSaga } from "./createSignatureCache/createSignatureCacheSaga";
import { createSignatureCacheGroupSaga } from "./createSignatureCacheGroup/createSignatureCacheGroupSaga";
import { removeSignatureCacheSaga } from "./removeSignatureCache/removeSignatureCacheSaga";

export function* signatureImageCacheEntitiesSaga() {
	yield spawn(createSignatureCacheSaga);
	yield spawn(removeSignatureCacheSaga);
	yield spawn(createSignatureCacheGroupSaga);
}
