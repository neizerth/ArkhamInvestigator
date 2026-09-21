import { spawn } from "redux-saga/effects";
import { assetDownloaderSaga } from "./asset-downloader/sagas";
import { downloadQueueSaga } from "./download-queue/sagas";

export function* assetsSaga() {
	yield spawn(assetDownloaderSaga);
	yield spawn(downloadQueueSaga);
}
