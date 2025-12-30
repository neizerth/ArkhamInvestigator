import { spawn } from "redux-saga/effects";
import { chaosBagNotificationsFeaturesSaga } from "./notifications/sagas";
import { updateChaosBagOnGameStartSaga } from "./updateChaosBagOnGameStart/updateChaosBagOnGameStartSaga";

export function* chaosBagFeaturesSaga() {
	yield spawn(chaosBagNotificationsFeaturesSaga);
	yield spawn(updateChaosBagOnGameStartSaga);
}
