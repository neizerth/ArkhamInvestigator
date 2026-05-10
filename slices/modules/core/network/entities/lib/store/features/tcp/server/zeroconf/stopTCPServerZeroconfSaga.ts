import {
	selectDeviceNetworkId,
	stopTCPServerZeroconf,
	unpublishZeroconfServiceByNetworkId,
} from "@modules/core/network/shared/lib";
import { select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	unpublishZeroconfServiceByNetworkId(networkId);
}

export function* stopTCPServerZeroconfSaga() {
	yield takeEvery(stopTCPServerZeroconf.match, worker);
}
