import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import { call, put, take } from "redux-saga/effects";
import {
	getNetworkInfoState,
	internetReachabilityChanged,
	type networkInfoUpdated,
	setHotspotEnabled,
	setIP,
	setNetworkConnected,
	setNetworkType,
	setOffline,
	setSSID,
	setWifiEnabled,
} from "../../shared/lib";
import { networkChannel } from "./networkChannel";

type Channel = ReturnType<typeof networkChannel>;

function* worker() {
	const channel: Channel = yield call(networkChannel);
	let internetReachable: boolean | null = null;

	while (true) {
		const action: ReturnType<typeof networkInfoUpdated> = yield take(channel);
		const { payload } = action;
		const { isInternetReachable } = payload;

		// the first known state is not a change: startup code checks the network itself
		if (typeof isInternetReachable === "boolean") {
			if (
				internetReachable !== null &&
				internetReachable !== isInternetReachable
			) {
				yield put(internetReachabilityChanged(isInternetReachable));
			}
			internetReachable = isInternetReachable;
		}

		const { ssid, ip, networkType, networkConnected, wifiEnabled, offline } =
			getNetworkInfoState(payload);

		// `isInternetReachable` is often `null` until the OS finishes probing; treating
		// unknown as offline breaks Android (everything looks disconnected).
		yield put(setOffline(offline));
		yield put(setWifiEnabled(wifiEnabled));
		yield put(setNetworkConnected(networkConnected));
		yield put(setNetworkType(networkType));
		yield put(setSSID(ssid));
		yield put(setIP(ip));
		yield put(setHotspotEnabled(false));
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeOnce(appStarted.match, worker);
}
