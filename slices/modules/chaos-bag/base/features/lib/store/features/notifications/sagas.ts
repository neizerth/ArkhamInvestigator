import { spawn } from "redux-saga/effects";
import { chaosBagAddChaosTokenNotificationsSaga } from "./addChaosToken/sagas";
import { cantAddChaosTokenNotificationsSaga } from "./cantAddChaosToken/sagas";
import { cantRemoveChaosTokenSaga } from "./cantRemoveChaosToken/sagas";
import { chaosTokenRemovedSaga } from "./chaosTokenRemoved/sagas";

export function* chaosBagNotificationsFeaturesSaga() {
	yield spawn(chaosBagAddChaosTokenNotificationsSaga);
	yield spawn(cantAddChaosTokenNotificationsSaga);
	yield spawn(chaosTokenRemovedSaga);
	yield spawn(cantRemoveChaosTokenSaga);
}
