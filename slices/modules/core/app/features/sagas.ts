import { spawn } from "redux-saga/effects";
import { appLoadSaga } from "./app-load/appLoadSaga";
import { checkInitialAppUpdatesSaga } from "./check-initial-app-updates/checkInitialAppUpdatesSaga";
import { checkOutdatedAppSaga } from "./check-outdated-app/checkOutdatedAppSaga";
import { restartAppModalActionSaga } from "./restart-app-modal-action/restartAppSaga";
import { startAppSaga } from "./start-app/startAppSaga";
import { updateAppDataSaga } from "./update-app-data/sagas";

export function* appFeaturesSaga() {
	yield spawn(startAppSaga);
	yield spawn(appLoadSaga);
	yield spawn(checkOutdatedAppSaga);
	yield spawn(checkInitialAppUpdatesSaga);
	yield spawn(updateAppDataSaga);
	yield spawn(restartAppModalActionSaga);
}
