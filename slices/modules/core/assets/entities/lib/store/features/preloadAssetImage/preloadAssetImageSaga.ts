import images from "@assets/images";
import {
	selectAssetImagesLoadedCount,
	setAssetImagesLoadedCount,
} from "@modules/core/assets/shared/lib/store";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { preloadAssetImage } from "./preloadAssetImage";
import { preloadAssetImageSource } from "./preloadAssetImageSource";

const filterAction = (action: unknown) => {
	if (!preloadAssetImage.match(action)) {
		return false;
	}

	const source = images[action.payload];

	return typeof source === "number";
};

function* worker({ payload }: ReturnType<typeof preloadAssetImage>) {
	const source = images[payload];

	yield call(preloadAssetImageSource, source);

	const count: ReturnType<typeof selectAssetImagesLoadedCount> = yield select(
		selectAssetImagesLoadedCount,
	);
	yield put(setAssetImagesLoadedCount(count + 1));
}

export function* preloadAssetImageSaga() {
	yield takeEvery(filterAction, worker);
}
