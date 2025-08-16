import { spawn } from "redux-saga/effects";
import { checkAppUpdatesSaga } from "./checkAppUpdates/checkAppUpdatesSaga";
import { updateAppInfoSaga } from "./updateAppInfo/updateAppInfoSaga";

export function* appEntitiesSaga() {
	yield spawn(checkAppUpdatesSaga);
	yield spawn(updateAppInfoSaga);
}
