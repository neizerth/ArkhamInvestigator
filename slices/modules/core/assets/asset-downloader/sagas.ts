import { spawn } from "redux-saga/effects";
import { assetDownloadEntitySaga } from "./entities/sagas";

export function* assetDownloaderSaga() {
	yield spawn(assetDownloadEntitySaga);
}
