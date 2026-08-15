import {
	createMessageIdCache,
	createTCPIncomeAction,
	getTCPServerSocket,
	isTCPIncomeAction,
	tcpActionReceived,
	tcpClientSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

const appliedMessages = createMessageIdCache();

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

		const { messageId } = tcpAction.meta;
		const action = createTCPIncomeAction(tcpAction, socket);

		const isAck = tcpActionReceived.match(action);

		// A retransmission (our ACK was lost): confirm again, but never apply twice.
		const duplicate = !isAck && appliedMessages.check(messageId);

		if (!duplicate) {
			yield put(action);
		}

		if (isAck) {
			return;
		}

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
