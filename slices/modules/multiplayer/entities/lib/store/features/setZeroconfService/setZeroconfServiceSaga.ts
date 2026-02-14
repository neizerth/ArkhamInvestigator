import { setHostIp } from "@modules/core/network/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { log } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { setZeroconfService } from "./setZeroconfService";

function* worker({ payload }: ReturnType<typeof setZeroconfService>) {
	if (!payload.addresses) {
		log.info("no addresses found in zeroconf service", payload);
		return;
	}
	const [ip] = payload.addresses ?? [];
	if (!ip) {
		log.info("no ip found in zeroconf service", payload);
		return;
	}

	console.log("setting host ip from zeroconf service", ip);
	yield put(setHostIp(ip));
	yield put(setGameStatus("initial"));
}

export function* setZeroconfServiceSaga() {
	yield takeEvery(setZeroconfService.match, worker);
}
