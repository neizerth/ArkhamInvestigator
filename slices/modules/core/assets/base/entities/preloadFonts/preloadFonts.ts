import { setFontsLoaded } from "@modules/core/assets/base/shared/lib";
import { call, put } from "redux-saga/effects";
import { preloadFontMap } from "./preloadFontMap";

export function* preloadFonts() {
	yield call(preloadFontMap);
	yield put(setFontsLoaded(true));
}
