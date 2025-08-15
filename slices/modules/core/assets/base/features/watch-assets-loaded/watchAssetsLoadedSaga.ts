import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectAssetImagesLoaded,
	selectExternalImagesReady,
	selectFontsLoaded,
	setAssetImagesLoaded,
	setAssetsLoaded,
	setExternalImagesReady,
	setFontsLoaded,
} from "../../shared/lib";

function* worker() {
	const fontsLoaded: ReturnType<typeof selectFontsLoaded> =
		yield select(selectFontsLoaded);

	const assetImagesLoaded: ReturnType<typeof selectFontsLoaded> = yield select(
		selectAssetImagesLoaded,
	);

	const externalImagesReady: ReturnType<typeof selectFontsLoaded> =
		yield select(selectExternalImagesReady);

	const done = fontsLoaded && assetImagesLoaded && externalImagesReady;

	if (!done) {
		return;
	}

	yield put(setAssetsLoaded(true));
}

export function* watchAssetsLoadedSaga() {
	yield takeEvery(setFontsLoaded.match, worker);
	yield takeEvery(setAssetImagesLoaded.match, worker);
	yield takeEvery(setExternalImagesReady.match, worker);
}
