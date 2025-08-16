import { appStarted } from "@modules/core/app/shared/lib";
import { call, take, takeEvery } from "redux-saga/effects";
import { networkChannel } from "./networkChannel";

type Channel = ReturnType<typeof networkChannel>;

function* worker() {
	const channel: Channel = yield call(networkChannel);
	while (true) {
		yield take(channel);
	}
}

export function* watchNetworkUpdateSaga() {
	yield takeEvery(appStarted.match, worker);
}
