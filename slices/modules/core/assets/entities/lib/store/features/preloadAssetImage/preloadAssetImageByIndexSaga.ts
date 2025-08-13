import {
	selectAssetImagesLoadedCount,
	setAssetImagesLoadedCount,
} from "@modules/core/assets/shared/lib/store";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { preloadAssetImage } from "./preloadAssetImage";
import { preloadAssetImageSource } from "./preloadAssetImageSource";

function* worker({ payload }: ReturnType<typeof preloadAssetImage>) {
	yield call(preloadAssetImageSource, payload);

	const count: ReturnType<typeof selectAssetImagesLoadedCount> = yield select(
		selectAssetImagesLoadedCount,
	);
	yield put(setAssetImagesLoadedCount(count + 1));
}

export function* preloadAssetImageSaga() {
	yield takeEvery(preloadAssetImage.match, worker);
}
