import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
import { log } from "@shared/config";
import { omit } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendTCPAction, sendTCPActionFailed } from "./sendTCPAction";

function* worker({ payload }: ReturnType<typeof sendTCPAction>) {
	log.info("Sending TCP action", payload.action.type);
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);
	const { socket, action, messageId } = payload;

	if (socket.destroyed) {
		log.error("Socket destroyed. Skipping action...");
		yield put(sendTCPActionFailed({ ...payload, type: "socket-destroyed" }));
		return;
	}

	const meta = omit(["remote"], action.meta);

	// meta.messageId = envelope (this packet); action.payload is unchanged (e.g. payload.messageId for tcpActionReceived = id we confirm)

	const tcpAction = {
		...action,
		meta: {
			...meta,
			messageId,
			networkId,
			source: "tcp",
			sentAt: new Date().toISOString(),
		},
	};

	try {
		const json = JSON.stringify(tcpAction);
		socket.write(`${json}\n`);
	} catch (error) {
		console.error("Error sending TCP action", error, tcpAction);
		if (error instanceof Error) {
			yield put(
				sendTCPActionFailed({
					...payload,
					type: "error",
					error: error,
				}),
			);
		} else {
			yield put(
				sendTCPActionFailed({
					...payload,
					type: "unknown",
					error: error,
				}),
			);
		}
	}
}

export function* sendTCPActionSaga() {
	yield takeEvery(sendTCPAction.match, worker);
}
