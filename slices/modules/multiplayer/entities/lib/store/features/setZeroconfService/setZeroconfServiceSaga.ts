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
	const [ip] = payload.addresses ?? [];

	if (!ip) {
		log.info("no usable dial IPs in zeroconf service", payload);
		return;
	}

	const ok: boolean = yield call(checkTcpHostReachable, ip);
	if (ok) {
		log.info("zeroconf host reachable, setting host IP", ip);
		yield put(setGameStatus("initial"));
		yield put(setHostIP(ip));
		return;
	}

	log.info("zeroconf host unreachable on game TCP port", {
		ip,
	});

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
