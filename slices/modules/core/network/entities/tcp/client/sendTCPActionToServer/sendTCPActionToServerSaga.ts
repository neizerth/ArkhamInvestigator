import {
	getTCPServerSocket,
	selectHostIp,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPActionToServer } from "./sendTCPActionToServer";

function* worker({ payload }: ReturnType<typeof sendTCPActionToServer>) {
	const hostIp: ReturnType<typeof selectHostIp> = yield select(selectHostIp);
	if (!hostIp) {
		console.log("No host IP found", payload);
		return;
	}
	const socket = getTCPServerSocket();
	if (!socket) {
		console.log("TCPServerSocket not found", payload);
		return;
	}

	yield put(
		sendTCPAction({
			...payload,
			socket,
		}),
	);
}

export function* sendTCPActionToServerSaga() {
	yield takeEvery(sendTCPActionToServer.match, worker);
}
