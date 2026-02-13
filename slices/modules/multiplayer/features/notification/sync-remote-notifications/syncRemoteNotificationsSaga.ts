import { createRemoteAction } from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { takeEvery } from "redux-saga/effects";

const filterAction = (
	action: unknown,
): action is ReturnType<typeof sendNotification> => {
	if (!sendNotification.match(action)) {
		return false;
	}
	return action.payload.remote === true;
};

function* worker(action: ReturnType<typeof sendNotification>) {
	const remoteAction = createRemoteAction(action);
	// yield put(sendRemoteTCPActionSaga(remoteAction));
	void remoteAction;
	yield undefined;
}

export function* syncRemoteNotificationsSaga() {
	yield takeEvery(filterAction, worker);
}
