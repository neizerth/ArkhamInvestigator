import { fork } from "redux-saga/effects";
import { sendGetCluesNotification } from "./send-get-clues-notification/sendGetCluesNotification";
import { sendGetResourcesNotification } from "./send-get-resources-notification/sendGetResourcesNotification";

export function* boardNotificationFeaturesSaga() {
	yield fork(sendGetCluesNotification);
	yield fork(sendGetResourcesNotification);
}
