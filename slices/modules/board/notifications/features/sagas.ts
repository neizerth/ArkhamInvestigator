import { fork } from "redux-saga/effects";
import { sendGetCluesNotification } from "./send-get-clues-notification/sendGetCluesNotification";
import { sendGetResourcesNotification } from "./send-get-resources-notification/sendGetResourcesNotification";
import { sendSpendResourcesNotificationSaga } from "./send-spend-resources-notification/sendSpendResourcesNotificationSaga";

export function* boardNotificationFeaturesSaga() {
	yield fork(sendGetCluesNotification);
	yield fork(sendGetResourcesNotification);
	yield fork(sendSpendResourcesNotificationSaga);
}
