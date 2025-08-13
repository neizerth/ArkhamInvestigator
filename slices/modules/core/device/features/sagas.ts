import { spawn } from "redux-saga/effects";
import { hideSplashScreenSaga } from "./hide-splash-screen/hideSplashScreenSaga";
import { initKeepAwakeSaga } from "./initKeepAwake/initKeepAwakeSaga";
import { lockPortraitOrientationSaga } from "./lock-portrait-orientation/lockPortraitOrientationSaga";

export function* deviceFeaturesSaga() {
	yield spawn(hideSplashScreenSaga);
	yield spawn(initKeepAwakeSaga);
	yield spawn(lockPortraitOrientationSaga);
}
