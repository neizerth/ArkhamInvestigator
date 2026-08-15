import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient/sendTCPActionToClient";
import {
	createMessageIdCache,
	createRemoteAction,
	createTCPIncomeAction,
	isTCPIncomeAction,
	setTCPClientSocket,
	tcpActionReceived,
	tcpServerSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

const appliedMessages = createMessageIdCache();

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

		const { networkId, messageId } = tcpAction.meta;

		setTCPClientSocket(networkId, socket);

		const action = createTCPIncomeAction(tcpAction, socket);

		// Do not send confirmation for tcpActionReceived itself — otherwise loop and deadlock
		const isAck = tcpActionReceived.match(tcpAction);

		// A retransmission (our ACK was lost): confirm again, but never apply twice.
		const duplicate = !isAck && appliedMessages.check(messageId);

		if (!duplicate) {
			yield put(action);
		}

		if (isAck) {
			return;
		}

		// Confirmation goes back to the sender's socket only — `targetNetworkId` rides in the meta,
		// which is what `sendRemoteTCPActionSaga` routes on.
		yield put(
			createRemoteAction(
				tcpActionReceived({
					messageId,
					type: action.type,
				}),
				{ targetNetworkId: networkId },
			),
		);

		if (duplicate) {
			return;
		}

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
