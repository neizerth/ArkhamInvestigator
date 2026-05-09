import {
	selectDeviceNetworkId,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import Zeroconf from "react-native-zeroconf";
import { select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	const zeroconf = new Zeroconf();

	zeroconf.unpublishService(networkId);
}

export function* stopTCPServerZeroconfSaga() {
	yield takeEvery(stopTCPServerZeroconf.match, worker);
}
