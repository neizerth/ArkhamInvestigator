import { spawn } from "redux-saga/effects";
import { checkAppUpdatesSaga } from "./checkAppUpdates/checkAppUpdatesSaga";
import { updateAppDataSaga } from "./updateAppData";
import { updateAppInfoSaga } from "./updateAppInfo/updateAppInfoSaga";

export function* appEntitiesSaga() {
	yield spawn(checkAppUpdatesSaga);
	yield spawn(updateAppInfoSaga);
	yield spawn(updateAppDataSaga);
}
