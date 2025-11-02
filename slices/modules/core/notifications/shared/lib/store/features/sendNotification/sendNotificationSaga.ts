import { takeEvery } from "redux-saga/effects";
import { notify } from "../../../notify";
import { sendNotification } from "./sendNotification";

function worker({ payload }: ReturnType<typeof sendNotification>) {
	notify(payload);
}

export function* sendNotificationSaga() {
	yield takeEvery(sendNotification.match, worker);
}
