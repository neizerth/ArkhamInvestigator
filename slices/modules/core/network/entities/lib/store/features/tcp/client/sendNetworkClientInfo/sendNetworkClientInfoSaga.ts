import {
	connectNetworkClient,
	selectHostIP,
	selectNickname,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendNetworkClientInfo } from "./sendNetworkClientInfo";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const hostIP: ReturnType<typeof selectHostIP> = yield select(selectHostIP);

	if (!hostIP) {
		return;
	}

	yield put(
		connectNetworkClient({
			nickname,
			hostIP,
		}),
	);
}

export function* sendNetworkClientInfoSaga() {
	yield takeEvery(sendNetworkClientInfo.match, worker);
}
