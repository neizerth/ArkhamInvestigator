import { put, takeEvery } from "redux-saga/effects";
import { setNetworkRole, stopTCPClient } from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setNetworkRole>) {
	if (payload === "client") {
		return;
	}
	yield put(stopTCPClient());
}

export function* stopTCPClientOnNetworkRoleChangeSaga() {
	yield takeEvery(setNetworkRole.match, worker);
}
