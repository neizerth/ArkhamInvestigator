import { spawn } from "redux-saga/effects";
import { chaosBagAddChaosTokenNotificationsSaga } from "./addChaosToken";

export function* chaosBagNotificationsSaga() {
	yield spawn(chaosBagAddChaosTokenNotificationsSaga);
}
