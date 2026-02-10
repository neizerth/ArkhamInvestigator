import {
	dispatchTCPClientAction,
	initNetworkClient,
	selectDeviceNetworkId,
	tcpClientSocketConnected,
} from "@modules/core/network/shared/lib";
import { call, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);
	console.log("initing network client on connected", networkId);
	yield call(
		dispatchTCPClientAction,
		initNetworkClient({
			networkId,
		}),
	);
}

export function* initTCPClientOnConnectedSaga() {
	yield takeEvery(tcpClientSocketConnected.match, worker);
}
