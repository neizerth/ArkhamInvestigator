import { spawn } from "redux-saga/effects";
import { downloadAssetSaga } from "./downloadAsset";
import { processAssetDownloadSaga } from "./processAssetDownload";

export function* assetDownloadEntitySaga() {
	yield spawn(downloadAssetSaga);
	yield spawn(processAssetDownloadSaga);
}
