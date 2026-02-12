import {
	getTCPServerSocket,
	isTCPIncomeAction,
	tcpActionReceived,
	tcpClientSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpClientSocketDataReceived>) {
	const { data } = payload;

	const socket = getTCPServerSocket();

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

		const action = {
			...tcpAction,
			meta: {
				...tcpAction.meta,
				notify: "self",
				source: "tcp",
				socket,
			},
		};

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
