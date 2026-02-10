import { put, takeEvery } from "redux-saga/effects";
import {
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setNetworkRole>) {
	if (payload === "host") {
		yield put(startTCPServer());
	} else {
		yield put(stopTCPServer());
	}
}

export function* runTCPServerOnNetworkRoleChangeSaga() {
	yield takeEvery(setNetworkRole.match, worker);
}
