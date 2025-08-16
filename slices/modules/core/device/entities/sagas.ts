import { spawn } from "redux-saga/effects";
import { setBackgroundColorSaga } from "./background-color/setBackgroundColor/setBackgroundColorSaga";
import { setKeepAwakeSaga } from "./keep-awake/setKeepAwake/setKeepAwakeSaga";
import { setNavigationBarStyleSaga } from "./navigation-bar/setNavigationBarStyle/setNavigationBarStyleSaga";
import { lockScreenOrientationSaga } from "./screen-orientation/lockScreenOrientation/lockScreenOrientationSaga";
import { hideSplashScreenSaga } from "./splash-screen/hideSplashScreen/hideSplashScreenSaga";

export function* deviceEntitiesSaga() {
	yield spawn(setKeepAwakeSaga);
	yield spawn(lockScreenOrientationSaga);
	yield spawn(hideSplashScreenSaga);
	yield spawn(setBackgroundColorSaga);
	yield spawn(setNavigationBarStyleSaga);
}
