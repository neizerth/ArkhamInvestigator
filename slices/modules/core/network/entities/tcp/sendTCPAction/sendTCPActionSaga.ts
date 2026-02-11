import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
import { omit } from "ramda";
import { select, takeEvery } from "redux-saga/effects";
import { sendTCPAction } from "./sendTCPAction";

function* worker({ payload }: ReturnType<typeof sendTCPAction>) {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);
	const { socket, action } = payload;

	if (socket.destroyed) {
		console.log("Socket destroyed", payload);
		return;
	}

	const meta = omit(["remote"], action.meta);

	const json = JSON.stringify({
		...action,
		meta: {
			...meta,
			networkId,
			source: "tcp",
		},
	});

	try {
		socket.write(json);
	} catch (error) {
		console.error("Error sending TCP action", error);
	}
}

export function* sendTCPActionSaga() {
	yield takeEvery(sendTCPAction.match, worker);
}
