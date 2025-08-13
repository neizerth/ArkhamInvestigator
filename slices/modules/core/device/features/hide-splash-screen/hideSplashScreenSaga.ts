import { setFontsLoaded } from "@modules/core/assets/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { hideSplashScreen } from "../../entities/splash-screen";

function* worker({ payload }: ReturnType<typeof setFontsLoaded>) {
	if (!payload) {
		return;
	}
	yield put(hideSplashScreen());
}

export function* hideSplashScreenSaga() {
	yield takeEvery(setFontsLoaded.match, worker);
}
