import images from "@assets/images";
import {
	setAssetImagesLoaded,
	setAssetImagesLoadedCount,
} from "@modules/core/assets/base/shared/lib";
import { call, put } from "redux-saga/effects";
import { preloadAssetImageSource } from "./preloadAssetImageSource";

export function* preloadAssetImages() {
	for (let i = 0; i < images.length; i++) {
		const source = images[i];

		if (typeof source === "number") {
			yield call(preloadAssetImageSource, source);
		}

		yield put(setAssetImagesLoadedCount(i + 1));
	}

	yield put(setAssetImagesLoaded(true));
}
