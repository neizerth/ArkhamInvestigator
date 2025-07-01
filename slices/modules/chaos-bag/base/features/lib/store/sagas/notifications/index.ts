import { spawn } from "redux-saga/effects";
import { chaosBagAddChaosTokenNotificationsSaga } from "./addChaosToken";
import { cantAddChaosTokenNotificationsSaga } from "./cantAddChaosToken";

export function* chaosBagNotificationsFeaturesSaga() {
	yield spawn(chaosBagAddChaosTokenNotificationsSaga);
	yield spawn(cantAddChaosTokenNotificationsSaga);
}
