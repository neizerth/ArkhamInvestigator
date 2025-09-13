import { spawn } from "redux-saga/effects";
import { addChaosTokensNotificationSaga } from "./addChaosTokensNotificationSaga";
import { addMultipleTokenNotificationSaga } from "./addMultipleTokenNotificationSaga";
import { addSingleTokenNotificationSaga } from "./addSingleTokenNotificationSaga";

export function* chaosBagAddChaosTokenNotificationsSaga() {
	yield spawn(addSingleTokenNotificationSaga);
	yield spawn(addMultipleTokenNotificationSaga);
	yield spawn(addChaosTokensNotificationSaga);
}
