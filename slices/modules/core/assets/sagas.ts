import { spawn } from "redux-saga/effects";
import { assetDownloaderSaga } from "./asset-downloader/sagas";
import { baseAssetsSaga } from "./base/sagas";

export function* assetsSaga() {
	yield spawn(baseAssetsSaga);
	yield spawn(assetDownloaderSaga);
}
