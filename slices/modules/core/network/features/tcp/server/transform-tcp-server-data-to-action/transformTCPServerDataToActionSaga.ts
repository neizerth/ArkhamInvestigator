import {
	isTCPIncomeAction,
	setTCPClientSocket,
	tcpActionReceived,
	tcpServerSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpServerSocketDataReceived>) {
	const { data, socket } = payload;

	try {
		const tcpAction = JSON.parse(data);

		if (!isTCPIncomeAction(tcpAction)) {
			return;
		}

		console.log(
			"server: recieved action",
			tcpAction.type,
			tcpAction.meta.messageId,
		);

		const { networkId } = tcpAction.meta;

		setTCPClientSocket(networkId, socket);

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

		// Do not send confirmation for tcpActionReceived itself — otherwise loop and deadlock
		if (tcpActionReceived.match(tcpAction)) {
			return;
		}

		const { messageId } = tcpAction.meta;

		yield put(
			tcpActionReceived({
				messageId,
				type: action.type,
				targetNetworkId: networkId,
			}),
		);
	} catch (error) {
		console.error("Error parsing TCP data", error);
	}
}

export function* transformTCPServerDataToActionSaga() {
	yield takeEvery(tcpServerSocketDataReceived.match, worker);
}
