import { appStarted } from "@modules/core/app/shared/lib";
import * as ScreenOrientation from "expo-screen-orientation";
import { takeEvery } from "redux-saga/effects";
import { lockScreenOrientation } from "../../entities/screen-orientation";

function* worker() {
	yield lockScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export function* lockPortraitOrientationSaga() {
	yield takeEvery(appStarted.match, worker);
}
