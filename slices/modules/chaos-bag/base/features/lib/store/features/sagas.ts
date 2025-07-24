import { spawn } from "redux-saga/effects";
import { chaosBagNotificationsFeaturesSaga } from "./notifications/sagas";

export function* chaosBagFeaturesSaga() {
	yield spawn(chaosBagNotificationsFeaturesSaga);
}
