import { fork } from "redux-saga/effects";
import { sendGetCluesNotification } from "./send-get-clues-notification/sendGetCluesNotification";
import { sendGetResourcesNotification } from "./send-get-resources-notification/sendGetResourcesNotification";
import { sendHealDamageNotificationSaga } from "./send-heal-damage-notification/sendHealHorrorNotificationSaga";
import { sendHealHorrorNotificationSaga } from "./send-heal-horror-notification/sendHealHorrorNotificationSaga";
import { sendSpendResourcesNotificationSaga } from "./send-spend-resources-notification/sendSpendResourcesNotificationSaga";

export function* boardNotificationFeaturesSaga() {
	yield fork(sendGetCluesNotification);
	yield fork(sendGetResourcesNotification);
	yield fork(sendSpendResourcesNotificationSaga);
	yield fork(sendHealDamageNotificationSaga);
	yield fork(sendHealHorrorNotificationSaga);
}
