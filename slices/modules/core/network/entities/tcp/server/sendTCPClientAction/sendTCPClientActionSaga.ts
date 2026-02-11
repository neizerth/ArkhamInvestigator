import {
	getTCPClientSocket,
	getTCPClientSockets,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPClientAction } from "./sendTCPClientAction";

function* worker({ payload }: ReturnType<typeof sendTCPClientAction>) {
	const { action } = payload;
	const sockets =
		payload.type === "single"
			? [getTCPClientSocket(payload.networkId)]
			: getTCPClientSockets();

	for (const socket of sockets) {
		if (!socket) {
			console.error("TCPClientSocket not found");
			return;
		}

		yield put(
			sendTCPAction({
				action,
				socket,
			}),
		);
	}
}

export function* sendTCPClientActionSaga() {
	yield takeEvery(sendTCPClientAction.match, worker);
}
