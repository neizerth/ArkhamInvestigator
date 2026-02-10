import { getTCPServerSocket } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPServerAction } from "./sendTCPServerAction";

function* worker({ payload }: ReturnType<typeof sendTCPServerAction>) {
	const socket = getTCPServerSocket();
	if (!socket) {
		console.error("TCPServerSocket not found");
		return;
	}

	yield put(
		sendTCPAction({
			...payload,
			socket,
		}),
	);
}

export function* sendTCPServerActionSaga() {
	yield takeEvery(sendTCPServerAction.match, worker);
}
