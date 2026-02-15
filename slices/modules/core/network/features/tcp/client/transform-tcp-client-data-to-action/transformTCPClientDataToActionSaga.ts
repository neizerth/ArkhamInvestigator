import {
	createTCPIncomeAction,
	getTCPServerSocket,
	isTCPIncomeAction,
	tcpActionReceived,
	tcpClientSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpClientSocketDataReceived>) {
	const { data } = payload;

	const socket = getTCPServerSocket();
	if (!socket) {
		return;
	}

	try {
		const tcpAction = JSON.parse(data);

		if (!isTCPIncomeAction(tcpAction)) {
			return;
		}

		console.log(
			"client: recieved action",
			tcpAction.type,
			tcpAction.meta.messageId,
		);

		const action = createTCPIncomeAction(tcpAction, socket);

		yield put(action);

		if (tcpActionReceived.match(action)) {
			return;
		}

		const { messageId } = tcpAction.meta;

		yield put(
			tcpActionReceived({
				messageId,
				type: action.type,
			}),
		);
	} catch (error) {
		console.error("Error parsing TCP data", error);
	}
}

export function* transformTCPClientDataToActionSaga() {
	yield takeEvery(tcpClientSocketDataReceived.match, worker);
}
