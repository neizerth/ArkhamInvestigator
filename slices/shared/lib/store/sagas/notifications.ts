import { notificationsSharedSaga } from "@modules/core/notifications/shared/lib/store/sagas/index";
import { spawn } from "redux-saga/effects";

export function* notificationsSaga() {
	yield spawn(notificationsSharedSaga);
}
