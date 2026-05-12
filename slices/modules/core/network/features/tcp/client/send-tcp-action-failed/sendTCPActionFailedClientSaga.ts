import { log } from "@modules/core/log/shared/config";
import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import { sendTCPActionFailed } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import {
	getSendTCPActionFailedDetail,
	getTCPServerSocket,
	selectHostIP,
	selectNetworkRole,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { selectGameStatus } from "@modules/game/shared/lib";
import { seconds } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const NOTIFY_THROTTLE_MS = seconds(8);
let lastNotifyAt = 0;

function shouldEmitToast(): boolean {
	const now = Date.now();
	if (now - lastNotifyAt < NOTIFY_THROTTLE_MS) {
		return false;
	}
	lastNotifyAt = now;
	return true;
}

function* worker({ payload }: ReturnType<typeof sendTCPActionFailed>) {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (networkRole !== "client") {
		return;
	}

	log.warn(
		"TCP send failed (client)",
		payload.action.type,
		getSendTCPActionFailedDetail(payload),
	);

	const activeSocket = getTCPServerSocket();
	if (!activeSocket || activeSocket !== payload.socket) {
		return;
	}

	const hostIP: ReturnType<typeof selectHostIP> = yield select(selectHostIP);
	if (!hostIP) {
		return;
	}

	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);

	if (gameStatus === "initial") {
		return;
	}

	log.info("Restarting TCP client");

	yield put(restartTCPClient());

	if (shouldEmitToast()) {
		yield put(
			sendNotification({
				message: "network.tcp-send-failed.client",
				type: "error",
			}),
		);
	}
}

export function* sendTCPActionFailedClientSaga() {
	yield takeEvery(sendTCPActionFailed.match, worker);
}
