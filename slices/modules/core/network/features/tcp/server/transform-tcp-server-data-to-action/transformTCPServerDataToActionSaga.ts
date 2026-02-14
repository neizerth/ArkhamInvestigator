import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient/sendTCPActionToClient";
import {
	createRemoteAction,
	createTCPIncomeAction,
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

		const action = createTCPIncomeAction(tcpAction, socket);

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

		// forward action to all clients except the one that sent it
		if (tcpAction.meta.notify === "all") {
			const remoteAction = createRemoteAction(action);
			yield put(
				sendTCPActionToClient({
					action: remoteAction,
					type: "all",
					except: [networkId],
				}),
			);
		}
	} catch (error) {
		console.error("Error parsing TCP data", error);
	}
}

export function* transformTCPServerDataToActionSaga() {
	yield takeEvery(tcpServerSocketDataReceived.match, worker);
}
