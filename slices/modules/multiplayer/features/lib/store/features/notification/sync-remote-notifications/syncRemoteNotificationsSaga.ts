import {
	createRemoteAction,
	isTCPOutcomeAction,
	sendRemoteAction,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = (
	action: unknown,
): action is ReturnType<typeof sendNotification> => {
	if (!sendNotification.match(action)) {
		return false;
	}
	if (action.payload.remote !== true) {
		return false;
	}
	// Skip actions received from network — avoid re-broadcast loop
	return isTCPOutcomeAction(action);
};

function* worker(action: ReturnType<typeof sendNotification>) {
	const remoteAction = createRemoteAction(action, {
		notify: "all",
	});

	yield put(
		sendRemoteAction({
			action: remoteAction,
		}),
	);
}

export function* syncRemoteNotificationsSaga() {
	yield takeEvery(filterAction, worker);
}
