import { spawn } from "redux-saga/effects";
import { preloadAssetImageSaga } from "./preloadAssetImage/preloadAssetImageByIndexSaga";
import { preloadFontsSaga } from "./preloadFonts/preloadFontsSaga";

export function* assetsEntitiesSaga() {
	yield spawn(preloadAssetImageSaga);
	yield spawn(preloadFontsSaga);
}
