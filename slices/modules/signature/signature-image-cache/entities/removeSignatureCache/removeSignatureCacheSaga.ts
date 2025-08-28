import { takeEvery } from "redux-saga/effects";
import { removeSignatureCache } from "./removeSignatureCache";

function* worker({ payload }: ReturnType<typeof removeSignatureCache>) {}

export function* removeSignatureCacheSaga() {
	yield takeEvery(removeSignatureCache.match, worker);
}
