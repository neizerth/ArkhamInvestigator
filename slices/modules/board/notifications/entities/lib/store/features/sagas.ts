import { spawn } from "redux-saga/effects";
import { sendInvestigatorNotificationSaga } from "./sendInvestigatorNotification/sendInvestigatorNotificationSaga";

export function* boardNotificationEntitiesSaga() {
	yield spawn(sendInvestigatorNotificationSaga);
}
