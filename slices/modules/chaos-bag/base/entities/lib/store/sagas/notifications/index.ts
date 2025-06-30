import { spawn } from "redux-saga/effects";
import { addMultipleTokenNotificationSaga } from "./addMultipleTokenNotificationSaga";
import { addSingleTokenNotificationSaga } from "./addSingleTokenNotificationSaga";

export function* chaosBagNotificationsSaga() {
	yield spawn(addSingleTokenNotificationSaga);
	yield spawn(addMultipleTokenNotificationSaga);
}
