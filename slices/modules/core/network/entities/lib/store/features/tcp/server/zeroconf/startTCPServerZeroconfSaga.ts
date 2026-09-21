import { tcpLog } from "@modules/core/log/shared/config";
import { TCP_SERVER_NAME } from "@modules/core/network/shared/config";
import {
	publishZeroconfService,
	selectDeviceNetworkId,
	selectNickname,
	startTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const name = nickname?.trim() || TCP_SERVER_NAME;

	tcpLog.info("tcp server zeroconf: starting", { networkId, name });

	publishZeroconfService({ name, networkId });
}

export function* startTCPServerZeroconfSaga() {
	yield takeEvery(startTCPServerZeroconf.match, worker);
}
