import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
import { omit } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendTCPAction, sendTCPActionFailed } from "./sendTCPAction";

function* worker({ payload }: ReturnType<typeof sendTCPAction>) {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);
	const { socket, action, messageId } = payload;

	if (socket.destroyed) {
		yield put(sendTCPActionFailed({ ...payload, type: "socket-destroyed" }));
		return;
	}

	const meta = omit(["remote"], action.meta);

	// meta.messageId = envelope (this packet); action.payload is unchanged (e.g. payload.messageId for tcpActionReceived = id we confirm)
	const json = JSON.stringify({
		...action,
		meta: {
			...meta,
			messageId,
			networkId,
			source: "tcp",
		},
	});

	try {
		socket.write(json);
	} catch (error) {
		console.error("Error sending TCP action", error);
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
