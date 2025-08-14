import { spawn } from "redux-saga/effects";
import { checkInitialAppUpdatesSaga } from "./check-initial-app-updates/checkInitialAppUpdatesSaga";
import { checkOutdatedAppSaga } from "./check-outdated-app";
import { initAppUISaga } from "./init-app-ui/initAppUISaga";

export function* appFeaturesSaga() {
	yield spawn(initAppUISaga);
	yield spawn(checkOutdatedAppSaga);
	yield spawn(checkInitialAppUpdatesSaga);
}
