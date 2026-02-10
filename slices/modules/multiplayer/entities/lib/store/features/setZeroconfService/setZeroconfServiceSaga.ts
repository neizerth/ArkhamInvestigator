import { setHostIp } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setZeroconfService } from "./setZeroconfService";

function* worker({ payload }: ReturnType<typeof setZeroconfService>) {
	const [ip] = payload.addresses;
	yield put(setHostIp(ip));
}

export function* setZeroconfServiceSaga() {
	yield takeEvery(setZeroconfService.match, worker);
}
