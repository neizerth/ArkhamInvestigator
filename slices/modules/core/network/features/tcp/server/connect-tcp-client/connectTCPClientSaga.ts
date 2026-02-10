import {
	filterTCPAction,
	hasTCPClientSocket,
	initNetworkClient,
	setTCPClientSocket,
} from "@modules/core/network/shared/lib";
import { addNetworkClient } from "@modules/core/network/shared/lib/store/networkClient";
import type { TCPReturnType } from "@modules/core/network/shared/model";
import { call, put, takeEvery } from "redux-saga/effects";

const filterAction = filterTCPAction(initNetworkClient.match);

function* worker({ meta, payload }: TCPReturnType<typeof initNetworkClient>) {
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
