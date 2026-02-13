import { spawn } from "redux-saga/effects";
import { syncRemoteNotificationsSaga } from "./sync-remote-notifications/syncRemoteNotificationsSaga";

export function* multiplayerNotificationSaga() {
	yield spawn(syncRemoteNotificationsSaga);
}
