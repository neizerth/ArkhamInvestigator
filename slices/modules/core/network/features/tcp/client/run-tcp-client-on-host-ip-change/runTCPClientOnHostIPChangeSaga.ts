import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectNetworkRole,
	setHostIp,
	startTCPClient,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setHostIp>) {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	if (networkRole !== "client" || !payload) {
		return;
	}

	yield put(startTCPClient({ host: payload }));
}

export function* runTCPClientOnHostIPChangeSaga() {
	yield takeEvery(setHostIp.match, worker);
}
