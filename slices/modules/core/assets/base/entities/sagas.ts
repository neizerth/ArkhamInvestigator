import { spawn } from "redux-saga/effects";
import { preloadAssetImageSaga } from "./preloadAssetImage/preloadAssetImageSaga";
import { preloadFontsSaga } from "./preloadFonts/preloadFontsSaga";

export function* assetsEntitiesSaga() {
	yield spawn(preloadAssetImageSaga);
	yield spawn(preloadFontsSaga);
}
