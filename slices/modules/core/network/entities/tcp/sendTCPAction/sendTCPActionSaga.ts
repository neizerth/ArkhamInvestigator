import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
import { omit } from "ramda";
import { select, takeEvery } from "redux-saga/effects";
import { sendTCPAction } from "./sendTCPAction";

function* worker({ payload }: ReturnType<typeof sendTCPAction>) {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);
	const { socket, action } = payload;

	const meta = omit(["remote"], action.meta);

	const json = JSON.stringify({
		...action,
		meta: {
			...meta,
			networkId,
			source: "tcp",
		},
	});

	socket.write(json);
}

export function* sendTCPActionSaga() {
	yield takeEvery(sendTCPAction.match, worker);
}
