import { spawn } from "redux-saga/effects";
import { checkAppUpdatesSaga } from "./checkAppUpdates/checkAppUpdatesSaga";
import { restartAppSaga } from "./restartApp/restartAppSaga";
import { updateAppInfoSaga } from "./updateAppInfo/updateAppInfoSaga";

export function* appEntitiesSaga() {
	yield spawn(checkAppUpdatesSaga);
	yield spawn(updateAppInfoSaga);
	yield spawn(restartAppSaga);
}
