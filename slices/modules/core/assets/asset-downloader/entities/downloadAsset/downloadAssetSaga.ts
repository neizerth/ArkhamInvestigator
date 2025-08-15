import { put, takeEvery } from "redux-saga/effects";
import { initAssetDownload } from "../../shared/lib";
import { downloadAsset } from "./downloadAsset";

function* worker({ payload }: ReturnType<typeof downloadAsset>) {
	yield put(initAssetDownload(payload));
}

export function* downloadAssetSaga() {
	yield takeEvery(downloadAsset.match, worker);
}
