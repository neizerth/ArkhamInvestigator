import { fetch } from "@react-native-community/netinfo";
import type { ReturnAwaited } from "@shared/model";
import { call, put, takeEvery } from "redux-saga/effects";
import { checkNetwork, networkChecked } from "./checkNetwork";

function* worker() {
	const state: ReturnAwaited<typeof fetch> = yield call(fetch);

	yield put(networkChecked(state));
}

export function* checkNetworkSaga() {
	yield takeEvery(checkNetwork.match, worker);
}
