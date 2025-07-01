import { spawn } from "redux-saga/effects";
import { sendNotificationSaga } from "./sendNotificationSaga";

export function* notificationsSharedSaga() {
	yield spawn(sendNotificationSaga);
}
