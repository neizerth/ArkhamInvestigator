import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import * as ScreenOrientation from "expo-screen-orientation";
import { put } from "redux-saga/effects";
import { lockScreenOrientation } from "../../entities/screen-orientation";

function* worker() {
	yield put(
		lockScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP),
	);
}

export function* lockPortraitOrientationSaga() {
	yield takeOnce(appStarted.match, worker);
}
