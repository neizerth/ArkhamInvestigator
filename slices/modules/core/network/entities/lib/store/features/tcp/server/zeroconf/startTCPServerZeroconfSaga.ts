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

	log.info("tcp server zeroconf: starting");
	const zeroconf = new Zeroconf();
	const name = nickname ?? TCP_SERVER_NAME;

	zeroconf.publishService(
		TCP_SERVICE_NAME,
		"tcp",
		"local.",
		networkId,
		TCP_PORT,
		{
			name,
		},
	);
}

export function* startTCPServerZeroconfSaga() {
	yield takeEvery(startTCPServerZeroconf.match, worker);
}
