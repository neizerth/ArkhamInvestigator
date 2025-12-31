import { appStarted } from "@modules/core/app/shared/lib";
import { call, put, take, takeEvery } from "redux-saga/effects";
import {
	type networkInfoUpdated,
	setOffline,
	setWifiEnabled,
} from "../../shared/lib";
import { networkChannel } from "./networkChannel";

type Channel = ReturnType<typeof networkChannel>;

function* worker() {
	const channel: Channel = yield call(networkChannel);
	while (true) {
		const action: ReturnType<typeof networkInfoUpdated> = yield take(channel);

		const { isInternetReachable, isWifiEnabled = false } = action.payload;
		yield put(setOffline(!isInternetReachable));
		yield put(setWifiEnabled(isWifiEnabled));
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeEvery(appStarted.match, worker);
}
