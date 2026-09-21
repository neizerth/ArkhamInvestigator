import { all, call, put } from "redux-saga/effects";
import { preloadAssetImages } from "../../entities/preloadAssetImages";
import { preloadFonts } from "../../entities/preloadFonts";
import { initAssetsInternal, setAssetsLoaded } from "../../shared/lib";
import { loadExternalImages } from "../download-external-images";

export function* loadAssets() {
	yield put(initAssetsInternal());

	yield all([
		call(preloadFonts),
		call(preloadAssetImages),
		call(loadExternalImages),
	]);

	yield put(setAssetsLoaded(true));
}
