import { setFontsLoaded } from "@modules/core/assets/shared/lib";
import { call, put, takeEvery } from "redux-saga/effects";
import { preloadFontMap } from "./preloadFontMap";
import { preloadFonts } from "./preloadFonts";

function* worker() {
	yield call(preloadFontMap);
	yield put(setFontsLoaded(true));
}

export function* preloadFontsSaga() {
	yield takeEvery(preloadFonts.match, worker);
}
