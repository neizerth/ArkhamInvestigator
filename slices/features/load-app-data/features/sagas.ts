import { fork } from "redux-saga/effects";
import { checkAppUpdatesSaga } from "./checkAppUpdates/checkAppUpdatesSaga";
import { checkInitialUpdatesSaga } from "./checkInitialUpdates/checkInitialUpdatesSaga";
import { updateAppDataSaga } from "./updateAppData/updateAppDataSaga";

export function* loadAppDataSaga() {
	yield fork(checkAppUpdatesSaga);
	yield fork(updateAppDataSaga);
	yield fork(checkInitialUpdatesSaga);
}
