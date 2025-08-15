import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectAssetImagesLoaded,
	selectFontsLoaded,
	setAssetImagesLoaded,
	setAssetsLoaded,
	setFontsLoaded,
} from "../../shared/lib";

function* worker() {
	const fontsLoaded: ReturnType<typeof selectFontsLoaded> =
		yield select(selectFontsLoaded);

	const assetImagesLoaded: ReturnType<typeof selectFontsLoaded> = yield select(
		selectAssetImagesLoaded,
	);

	const done = fontsLoaded && assetImagesLoaded;

	if (!done) {
		return;
	}

	yield put(setAssetsLoaded(true));
}

export function* watchAssetsLoadedSaga() {
	yield takeEvery(setFontsLoaded.match, worker);
	yield takeEvery(setAssetImagesLoaded.match, worker);
}
