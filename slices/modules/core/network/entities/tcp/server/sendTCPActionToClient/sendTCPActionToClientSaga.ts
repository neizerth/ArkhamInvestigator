import {
	getTCPClientSocket,
	getTCPClientSockets,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPActionToClient } from "./sendTCPActionToClient";

function* worker({ payload }: ReturnType<typeof sendTCPActionToClient>) {
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

export function* sendTCPActionToClientSaga() {
	yield takeEvery(sendTCPActionToClient.match, worker);
}
