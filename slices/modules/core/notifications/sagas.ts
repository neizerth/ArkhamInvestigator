import { spawn } from "redux-saga/effects";
import { notificationsSharedSaga } from "./shared/sagas";

export function* notificationsSaga() {
	yield spawn(notificationsSharedSaga);
}
