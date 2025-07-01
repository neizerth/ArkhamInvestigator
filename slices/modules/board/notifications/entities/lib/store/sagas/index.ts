import { spawn } from "redux-saga/effects";
import { sendInvestigatorNotificationSaga } from "./sendInvestigatorNotificationSaga";

export function* boardNotificationSharedSaga() {
	yield spawn(sendInvestigatorNotificationSaga);
}
