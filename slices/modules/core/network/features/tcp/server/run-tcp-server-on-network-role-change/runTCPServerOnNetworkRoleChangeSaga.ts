import { put, takeEvery } from "redux-saga/effects";
import {
	setHostIp,
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setNetworkRole>) {
	if (payload === "host") {
		yield put(setHostIp(null));
		yield put(startTCPServer());
	} else {
		yield put(stopTCPServer({ name: null }));
	}
}

export function* runTCPServerOnNetworkRoleChangeSaga() {
	yield takeEvery(setNetworkRole.match, worker);
}
