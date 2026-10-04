import { spawn } from "redux-saga/effects";
import { initBackgroundColorSaga } from "./init-background-color";
import { initDeviceAppStatusChangeSaga } from "./init-device-app-status-change";
import { initKeepAwakeSaga } from "./init-keep-awake";
import { initNavigationbarSaga } from "./init-navigation-bar";
import { initScreenOrientationSaga } from "./init-screen-orientation";

export function* deviceFeaturesSaga() {
	yield spawn(initKeepAwakeSaga);
	yield spawn(initBackgroundColorSaga);
	yield spawn(initNavigationbarSaga);
	yield spawn(initDeviceAppStatusChangeSaga);
	yield spawn(initScreenOrientationSaga);
}
