import { put, select, takeEvery } from "redux-saga/effects";
import { preloadAssetImage } from "../../entities/preloadAssetImage";
import {
	selectAssetImagesCount,
	setAssetImagesLoaded,
	setAssetImagesLoadedCount,
} from "../../shared/lib";

function* worker(action: ReturnType<typeof setAssetImagesLoadedCount>) {
	const index = action.payload;
	const total: ReturnType<typeof selectAssetImagesCount> = yield select(
		selectAssetImagesCount,
	);
	const done = index === total;

	if (done) {
		yield put(setAssetImagesLoaded(true));
		return;
	}

	yield put(preloadAssetImage(index));
}

export function* watchAssetImagesLoadedSaga() {
	yield takeEvery(setAssetImagesLoadedCount.match, worker);
}
