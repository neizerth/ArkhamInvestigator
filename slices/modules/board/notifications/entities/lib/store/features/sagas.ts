import { spawn } from "redux-saga/effects";
import { sendInvestigatorNotificationSaga } from "./sendInvestigatorNotification/sendInvestigatorNotificationSaga";

export function* boardNotificationSharedSaga() {
	yield spawn(sendInvestigatorNotificationSaga);
}
