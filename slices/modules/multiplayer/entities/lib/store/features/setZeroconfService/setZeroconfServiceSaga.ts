import { log } from "@modules/core/log/shared/config";
import {
	checkTcpHostReachable,
	setHostIP,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { call, put, takeEvery } from "redux-saga/effects";
import { setZeroconfService } from "./setZeroconfService";

function* worker({ payload }: ReturnType<typeof setZeroconfService>) {
	if (!payload.addresses?.length) {
		log.info("no addresses found in zeroconf service", payload);
		return;
	}

	for (const ip of payload.addresses) {
		console.log("checking tcp host reachability", ip);
		if (!ip) {
			continue;
		}
		const reachable: boolean = yield call(checkTcpHostReachable, ip);
		if (reachable) {
			log.info("setting host ip from zeroconf service", ip);
			yield put(setGameStatus("initial"));
			yield put(setHostIP(ip));
			return;
		}
	}

	log.info("no reachable tcp host among zeroconf addresses", payload.addresses);
	yield put(
		sendNotification({
			message: "network.hostUnreachable",
			type: "error",
		}),
	);
}

export function* setZeroconfServiceSaga() {
	yield takeEvery(setZeroconfService.match, worker);
}
