import { spawn } from "redux-saga/effects";
import { sendNotificationSaga } from "./sendNotification/sendNotificationSaga";

export function* notificationsSharedSaga() {
	yield spawn(sendNotificationSaga);
}
