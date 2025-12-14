import { appStarted } from "@modules/core/app/shared/lib";
import { isBoolean } from "ramda-adjunct";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { type networkInfoUpdated, setOffline } from "../../shared/lib";
import { networkChannel } from "./networkChannel";

type Channel = ReturnType<typeof networkChannel>;

function* worker() {
	const channel: Channel = yield call(networkChannel);
	while (true) {
		const action: ReturnType<typeof networkInfoUpdated> = yield take(channel);

		const { isInternetReachable } = action.payload;
		if (isBoolean(isInternetReachable)) {
			yield put(setOffline(!isInternetReachable));
		}
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeEvery(appStarted.match, worker);
}
