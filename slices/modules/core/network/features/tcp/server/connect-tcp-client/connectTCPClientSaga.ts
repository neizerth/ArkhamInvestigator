import {
	connectNetworkClient,
	filterTCPIncomeAction,
	hasTCPClientSocket,
	setTCPClientSocket,
} from "@modules/core/network/shared/lib";
import { addNetworkClient } from "@modules/core/network/shared/lib/store/networkClient";
import type { TCPIncomeReturnType } from "@modules/core/network/shared/model";
import { call, put, takeEvery } from "redux-saga/effects";

const filterAction = filterTCPIncomeAction(connectNetworkClient.match);

function* worker({
	meta,
	payload,
}: TCPIncomeReturnType<typeof connectNetworkClient>) {
	console.log("connectTCPClientSaga", payload);
	const { nickname } = payload;
	const { networkId, socket } = meta;

	const exists = hasTCPClientSocket(networkId);

	yield call(setTCPClientSocket, networkId, socket);

	if (exists) {
		console.error("TCPClientSocket already exists");
		return;
	}

	console.log("connecting TCP client", payload);

	yield put(
		addNetworkClient({
			id: networkId,
			nickname,
		}),
	);
}

export function* connectTCPClientSaga() {
	yield takeEvery(filterAction, worker);
}
