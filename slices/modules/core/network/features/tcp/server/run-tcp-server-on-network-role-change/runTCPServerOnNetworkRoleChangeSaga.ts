import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectHostRunning,
	setHostIp,
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setNetworkRole>) {
	if (payload === "host") {
		yield put(setHostIp(null));

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
	yield takeEvery(setNetworkRole.match, worker);
}
