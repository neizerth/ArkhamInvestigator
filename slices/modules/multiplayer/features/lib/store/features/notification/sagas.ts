import { spawn } from "redux-saga/effects";
import { syncInvestigatorNotificationsSaga } from "./sync-investigator-notifications/syncInvestigatorNotificationsSaga";
import { syncRemoteNotificationsSaga } from "./sync-remote-notifications/syncRemoteNotificationsSaga";

export function* multiplayerNotificationSaga() {
	yield spawn(syncRemoteNotificationsSaga);
	yield spawn(syncInvestigatorNotificationsSaga);
}
