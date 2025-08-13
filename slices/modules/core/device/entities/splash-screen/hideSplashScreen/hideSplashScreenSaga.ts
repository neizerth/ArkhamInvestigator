import { hideAsync } from "expo-splash-screen";
import { call, put, takeEvery } from "redux-saga/effects";
import { hideSplashScreen, splashScreenHidden } from "./hideSplashScreen";

function* worker() {
	yield call(hideAsync);
	yield put(splashScreenHidden());
}

export function* hideSplashScreenSaga() {
	yield takeEvery(hideSplashScreen.match, worker);
}
