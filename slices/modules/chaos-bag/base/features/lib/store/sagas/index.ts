import { spawn } from "redux-saga/effects";
import { chaosBagNotificationsFeaturesSaga } from "./notifications";

export function* chaosBagFeaturesSaga() {
	yield spawn(chaosBagNotificationsFeaturesSaga);
}
