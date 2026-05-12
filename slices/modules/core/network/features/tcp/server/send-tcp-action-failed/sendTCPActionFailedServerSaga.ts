import { log } from "@modules/core/log/shared/config";
import { sendTCPActionFailed } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import {
	getSendTCPActionFailedDetail,
	getTCPClientSocketNetworkId,
	selectNetworkRole,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
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
	if (networkRole !== "host") {
		return;
	}

	log.warn(
		"TCP send failed (host)",
		payload.action.type,
		getSendTCPActionFailedDetail(payload),
	);

	const networkId = getTCPClientSocketNetworkId(payload.socket);
	if (!networkId) {
		log.warn("TCP send failed for unknown client socket");
		return;
	}

	log.info("Destroying TCP client socket");

	try {
		payload.socket.destroy();
	} catch {
		// already torn down
	}

	if (shouldEmitToast()) {
		yield put(
			sendNotification({
				message: "network.tcp-send-failed.host",
				type: "error",
			}),
		);
	}
}

export function* sendTCPActionFailedServerSaga() {
	yield takeEvery(sendTCPActionFailed.match, worker);
}
