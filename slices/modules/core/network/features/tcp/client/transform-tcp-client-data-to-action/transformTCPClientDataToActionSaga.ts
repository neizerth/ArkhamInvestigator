import { log, tcpLog } from "@modules/core/log/shared/config";
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

		tcpLog.info(
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

		// Looks like a plain local dispatch, but `tcpActionReceived`'s own action creator already
		// applies `withRemoteMeta` (see tcpCommon.ts) which stamps `meta.remote = true` — that's what
		// `sendRemoteTCPActionSaga` needs to actually forward this onto the wire via
		// `sendTCPActionToServer`. No `createRemoteAction()` wrapper needed here (unlike the host
		// side's reply in transformTCPServerDataToActionSaga, which also needs `targetNetworkId` to
		// route to one specific client out of possibly several — the client only ever has one peer).
		yield put(
			tcpActionReceived({
				messageId,
				type: action.type,
			}),
		);
	} catch (error) {
		log.error("Error parsing TCP data", error);
	}
}

export function* transformTCPClientDataToActionSaga() {
	yield takeEvery(tcpClientSocketDataReceived.match, worker);
}
