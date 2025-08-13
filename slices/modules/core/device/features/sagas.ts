import { spawn } from "redux-saga/effects";
import { hideSplashScreenSaga } from "./hide-splash-screen/hideSplashScreenSaga";
import { initKeepAwakeSaga } from "./init-keep-awake/initKeepAwakeSaga";
import { initBackgroundColorSaga } from "./inti-background-color/initBackgroundColorSaga";
import { lockPortraitOrientationSaga } from "./lock-portrait-orientation/lockPortraitOrientationSaga";

export function* deviceFeaturesSaga() {
	yield spawn(hideSplashScreenSaga);
	yield spawn(initKeepAwakeSaga);
	yield spawn(lockPortraitOrientationSaga);
	yield spawn(initBackgroundColorSaga);
}
