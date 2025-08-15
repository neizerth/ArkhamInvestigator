import { spawn } from "redux-saga/effects";
import { downloadExternalImagesSaga } from "./download-external-images/downloadExternalImagesSaga";
import { initAssetsSaga } from "./init-assets/initAssetsSaga";
import { watchAssetImagesLoadedSaga } from "./watch-asset-images-loaded/watchAssetImagesLoadedSaga";
import { watchAssetsLoadedSaga } from "./watch-assets-loaded/watchAssetsLoadedSaga";

export function* assetsFeaturesSaga() {
	yield spawn(watchAssetImagesLoadedSaga);
	yield spawn(initAssetsSaga);
	yield spawn(watchAssetsLoadedSaga);
	yield spawn(downloadExternalImagesSaga);
}
