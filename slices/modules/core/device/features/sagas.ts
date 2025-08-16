import { spawn } from "redux-saga/effects";
import { hideSplashScreenSaga } from "./hide-splash-screen/hideSplashScreenSaga";
import { initBackgroundColorSaga } from "./init-background-color/initBackgroundColorSaga";
import { initKeepAwakeSaga } from "./init-keep-awake/initKeepAwakeSaga";
import { initNavigationbarSaga } from "./init-navigation-bar/initNavigationbarSaga";
import { lockPortraitOrientationSaga } from "./lock-portrait-orientation/lockPortraitOrientationSaga";

export function* deviceFeaturesSaga() {
	yield spawn(hideSplashScreenSaga);
	yield spawn(initKeepAwakeSaga);
	yield spawn(lockPortraitOrientationSaga);
	yield spawn(initBackgroundColorSaga);
	yield spawn(initNavigationbarSaga);
}
