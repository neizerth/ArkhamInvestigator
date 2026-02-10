import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectNetworkRole,
	setHostIp,
	startTCPClient,
	stopTCPClient,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setHostIp>) {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	console.log("running tcp client on host ip change", networkRole, payload);

	if (networkRole !== "client" || !payload) {
		return;
	}
	yield put(stopTCPClient());

	yield put(startTCPClient({ host: payload }));
}

export function* runTCPClientOnHostIPChangeSaga() {
	yield takeEvery(setHostIp.match, worker);
}
