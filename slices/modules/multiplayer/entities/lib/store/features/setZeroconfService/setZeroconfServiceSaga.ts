import { setHostIp } from "@modules/core/network/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setZeroconfService } from "./setZeroconfService";

function* worker({ payload }: ReturnType<typeof setZeroconfService>) {
	const [ip] = payload.addresses;
	yield put(setHostIp(ip));
	yield put(setGameStatus("initial"));
}

export function* setZeroconfServiceSaga() {
	yield takeEvery(setZeroconfService.match, worker);
}
