import {
	connectNetworkClient,
	selectNickname,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { sendNetworkClientInfo } from "./sendNetworkClientInfo";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	yield put(
		connectNetworkClient({
			nickname,
		}),
	);
}

export function* sendNetworkClientInfoSaga() {
	yield takeEvery(sendNetworkClientInfo.match, worker);
}
