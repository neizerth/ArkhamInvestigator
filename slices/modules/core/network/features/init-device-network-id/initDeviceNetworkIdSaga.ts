import { appStarted } from "@modules/core/app/shared/lib";
import { log } from "@modules/core/log/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import {
	UNINITIALIZED_DEVICE_NETWORK_ID,
	selectDeviceNetworkId,
	setDeviceNetworkId,
} from "../../shared/lib";

/**
 * Why: `deviceNetworkId` used to be assigned only by the persist migration, which redux-persist
 * runs against **existing** stored state. A fresh install has none, so every clean install kept the
 * placeholder id — and two such devices collided: the host keeps one socket per networkId, so the
 * second client evicted the first from the lobby, and `selectPlayerBoards` matched the other
 * player's boards as our own.
 */
function* worker() {
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	if (networkId && networkId !== UNINITIALIZED_DEVICE_NETWORK_ID) {
		return;
	}

	const id = v4();
	log.info("assigning device network id", id);
	yield put(setDeviceNetworkId(id));
}

export function* initDeviceNetworkIdSaga() {
	yield takeEvery(appStarted.match, worker);
}
