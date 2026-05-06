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

		// `isInternetReachable` is often `null` until the OS finishes probing; treating
		// unknown as offline breaks Android (everything looks disconnected).
		yield put(setOffline(isInternetReachable === false));
		yield put(setWifiEnabled(isWifiEnabled));
		yield put(setNetworkConnected(isConnected ?? false));
		yield put(setNetworkType(payload.type));

		if (payload.type === "wifi") {
			yield put(
				setSSID(
					payload.details && "ssid" in payload.details
						? (payload.details.ssid ?? null)
						: null,
				),
			);
		} else {
			yield put(setSSID(null));
		}

		if (payload.type === "wifi" || payload.type === "ethernet") {
			const ip =
				payload.details && "ipAddress" in payload.details
					? (payload.details.ipAddress ?? null)
					: null;
			yield put(setIP(ip));
		} else {
			yield put(setIP(null));
		}
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeEvery(appStarted.match, worker);
}
