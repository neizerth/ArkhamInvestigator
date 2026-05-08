import { appStarted } from "@modules/core/app/shared/lib";
import { call, put, take, takeEvery } from "redux-saga/effects";
import {
	getNetworkInfoState,
	type networkInfoUpdated,
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
	while (true) {
		const action: ReturnType<typeof networkInfoUpdated> = yield take(channel);
		const { payload } = action;

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
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeEvery(appStarted.match, worker);
}
