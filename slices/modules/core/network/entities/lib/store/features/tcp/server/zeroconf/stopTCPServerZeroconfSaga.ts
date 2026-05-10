import { TCP_SERVER_NAME } from "@modules/core/network/shared/config";
import {
	selectNickname,
	stopTCPServerZeroconf,
	unpublishZeroconfService,
} from "@modules/core/network/shared/lib";
import { select, takeEvery } from "redux-saga/effects";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const name = nickname?.trim() || TCP_SERVER_NAME;

	unpublishZeroconfService(name);
}

export function* stopTCPServerZeroconfSaga() {
	yield takeEvery(stopTCPServerZeroconf.match, worker);
}
