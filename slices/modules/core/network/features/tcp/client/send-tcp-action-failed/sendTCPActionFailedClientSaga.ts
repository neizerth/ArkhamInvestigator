import { tcpLog } from "@modules/core/log/shared/config";
import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import { sendTCPActionFailed } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import {
	getSendTCPActionFailedDetail,
	getTCPServerSocket,
	selectClientReconnectAllowed,
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
	if (networkRole !== "client") {
		return;
	}

	tcpLog.warn(
		"TCP send failed (client)",
		payload.action.type,
		getSendTCPActionFailedDetail(payload),
	);

	const activeSocket = getTCPServerSocket();
	if (!activeSocket || activeSocket !== payload.socket) {
		return;
	}

	// Same reconnect-eligibility rule as a dropped socket (selectClientReconnectAllowed): a send
	// that fails while still in the lobby (gameStatus "initial" on the startMultiplayer route) must
	// retry too, not give up — a failed send there is not meaningfully different from a dropped
	// socket there. Previously this checked gameStatus === "initial" on its own and always gave up,
	// which was the opposite of the dropped-socket behavior for the identical lobby state.
	const reconnectAllowed: ReturnType<typeof selectClientReconnectAllowed> =
		yield select(selectClientReconnectAllowed);
	if (!reconnectAllowed) {
		return;
	}

	tcpLog.info("Restarting TCP client");

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
