import { appStarted } from "@modules/core/app/shared/lib";
import { call, put, take, takeEvery } from "redux-saga/effects";
import {
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

		const { isInternetReachable, isWifiEnabled = false, isConnected } = payload;

		yield put(setOffline(!isInternetReachable));
		yield put(setWifiEnabled(isWifiEnabled));
		yield put(setNetworkConnected(isConnected ?? false));
		yield put(setNetworkType(payload.type));

		if (payload.type === "wifi") {
			yield put(setSSID(payload.details.ssid));
		}
		if (payload.type === "wifi" || payload.type === "ethernet") {
			yield put(setIP(payload.details.ipAddress));
		}
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeEvery(appStarted.match, worker);
}
