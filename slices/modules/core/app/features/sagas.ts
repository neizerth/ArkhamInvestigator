import { spawn } from "redux-saga/effects";
import { checkInitialAppUpdatesSaga } from "./check-initial-app-updates/checkInitialAppUpdatesSaga";
import { checkOutdatedAppSaga } from "./check-outdated-app";
import { initAppUISaga } from "./init-app-ui/initAppUISaga";
import { updateDataOnLanguageChangeSaga } from "./update-data-on-language-change/updateDataOnLanguageChangeSaga";

export function* appFeaturesSaga() {
	yield spawn(initAppUISaga);
	yield spawn(checkOutdatedAppSaga);
	yield spawn(checkInitialAppUpdatesSaga);
	yield spawn(updateDataOnLanguageChangeSaga);
}
