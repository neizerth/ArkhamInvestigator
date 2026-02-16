import { delay, takeEvery } from "redux-saga/effects";
import { notify } from "../../../notify";
import { sendNotification } from "./sendNotification";

function* worker({ payload }: ReturnType<typeof sendNotification>) {
	// Wait for ToastProvider to be mounted
	yield delay(10);
	notify(payload);
}

export function* sendNotificationSaga() {
	yield takeEvery(sendNotification.match, worker);
}
