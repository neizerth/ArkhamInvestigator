import {
	TCP_PORT,
	TCP_SERVER_NAME,
	TCP_SERVICE_NAME,
} from "@modules/core/network/shared/config";
import {
	selectDeviceNetworkId,
	selectNickname,
	startTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { log } from "@shared/config/logger";
import Zeroconf from "react-native-zeroconf";
import { select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const displayName = nickname?.trim() || TCP_SERVER_NAME;

	log.info("tcp server zeroconf: starting", { networkId, displayName });
	const zeroconf = new Zeroconf();

	zeroconf.publishService(
		TCP_SERVICE_NAME,
		"tcp",
		"local.",
		displayName,
		TCP_PORT,
		{
			networkId,
		},
	);
}

export function* startTCPServerZeroconfSaga() {
	yield takeEvery(startTCPServerZeroconf.match, worker);
}
