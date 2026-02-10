import {
	clearTCPClientSocket,
	getTCPClientSocketNetworkId,
	tcpServerSocketClosed,
} from "@modules/core/network/shared/lib";
import { removeNetworkClient } from "@modules/core/network/shared/lib/store/networkClient";
import { call, put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpServerSocketClosed>) {
	const { socket } = payload;
	const networkId = getTCPClientSocketNetworkId(socket);

	yield call(clearTCPClientSocket, socket);

	if (!networkId) {
		console.error("Network ID not found");
		return;
	}

	yield put(removeNetworkClient(networkId));
}

export function* disconnectTCPClientSaga() {
	yield takeEvery(tcpServerSocketClosed.match, worker);
}
