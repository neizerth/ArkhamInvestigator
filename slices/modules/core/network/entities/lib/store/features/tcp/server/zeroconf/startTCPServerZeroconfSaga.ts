import { TCP_SERVER_NAME } from "@modules/core/network/shared/config";
import {
	publishZeroconfService,
	selectDeviceNetworkId,
	selectNickname,
	startTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { log } from "@shared/config/logger";
import { select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const name = nickname?.trim() || TCP_SERVER_NAME;

	log.info("tcp server zeroconf: starting", { networkId, name });

	publishZeroconfService({ name, networkId });
}

export function* startTCPServerZeroconfSaga() {
	yield takeEvery(startTCPServerZeroconf.match, worker);
}
