import { spawn } from "redux-saga/effects";
import { checkAppUpdatesSaga } from "./checkAppUpdates/checkAppUpdatesSaga";
import { updateAppDataSaga } from "./updateAppData/updateAppDataSaga";

export function* appEntitiesSaga() {
	yield spawn(checkAppUpdatesSaga);
	yield spawn(updateAppDataSaga);
}
