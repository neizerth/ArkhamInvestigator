import { fork } from "redux-saga/effects";
import { sendGetCluesNotification } from "./send-get-clues-notification/sendGetCluesNotification";

export function* boardNotificationFeaturesSaga() {
	yield fork(sendGetCluesNotification);
}
