import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectHostRunning,
	selectNetworkRole,
	setHostIP,
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setNetworkRole>) {
	if (payload === "host") {
		yield put(setHostIP(null));

		const hostRunning: ReturnType<typeof selectHostRunning> =
			yield select(selectHostRunning);
		if (hostRunning) {
			return;
		}
		yield put(startTCPServer());
	} else {
		yield put(stopTCPServer({ name: null }));
	}
}

export function* runTCPServerOnNetworkRoleChangeSaga() {
	// Cold start / persistence: role can already be "host" without emitting `setNetworkRole`.
	// Ensure the server starts once in that case.
	const role: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (role === "host") {
		const hostRunning: ReturnType<typeof selectHostRunning> =
			yield select(selectHostRunning);
		if (!hostRunning) {
			yield put(setHostIP(null));
			yield put(startTCPServer());
		}
	}
	yield takeEvery(setNetworkRole.match, worker);
}
