import { spawn } from "redux-saga/effects";
import { checkInitialAppUpdatesSaga } from "./check-initial-app-updates/checkInitialAppUpdatesSaga";
import { checkOutdatedAppSaga } from "./check-outdated-app/checkOutdatedAppSaga";
import { initAppUISaga } from "./init-app-ui/initAppUISaga";
import { restartAppModalActionSaga } from "./restart-app-modal-action/restartAppSaga";
import { updateAppDataSaga } from "./update-app-data/sagas";

export function* appFeaturesSaga() {
	yield spawn(initAppUISaga);
	yield spawn(checkOutdatedAppSaga);
	yield spawn(checkInitialAppUpdatesSaga);
	yield spawn(updateAppDataSaga);
	yield spawn(restartAppModalActionSaga);
}
