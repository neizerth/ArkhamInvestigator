import { selectHostIp, setHostIp } from "@modules/core/network/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { log } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { setZeroconfService } from "./setZeroconfService";

function* worker({ payload }: ReturnType<typeof setZeroconfService>) {
	if (!payload.addresses) {
		log.info("no addresses found in zeroconf service", payload);
		return;
	}
	const [ip] = payload.addresses ?? [];
	const currentHostIp: string | null = yield select(selectHostIp);
	if (currentHostIp === ip) {
		return;
	}
	console.log("setting host ip from zeroconf service", ip);
	yield put(setHostIp(ip));
	yield put(setGameStatus("initial"));
}

export function* setZeroconfServiceSaga() {
	yield takeEvery(setZeroconfService.match, worker);
}
