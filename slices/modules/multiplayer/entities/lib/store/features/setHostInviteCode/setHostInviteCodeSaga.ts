import {
	setHostIP,
	tcpClientSocketConnected,
	tcpClientSocketError,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { delay, put, race, take, takeEvery } from "redux-saga/effects";
import { getHostIPFromInviteCode } from "../../../logic";
import { setHostInviteCode } from "./setHostInviteCode";

const CONNECT_TIMEOUT_MS = 10000;

function* worker({ payload }: ReturnType<typeof setHostInviteCode>) {
	const ip = getHostIPFromInviteCode(payload);
	if (!ip || !payload) {
		yield put(
			sendNotification({
				message: "multiplayer.error.invalidInviteCode",
				type: "error",
			}),
		);
		return;
	}

	yield put(setGameStatus("initial"));

	/** `setHostIP` is what actually starts the TCP client — it must be dispatched
	 * before we wait for the connection result, otherwise the race never settles. */
	yield put(setHostIP(ip));

	const {
		error,
		timeout,
	}: {
		error?: ReturnType<typeof tcpClientSocketError>;
		timeout?: true;
	} = yield race({
		task: take(tcpClientSocketConnected),
		error: take(tcpClientSocketError),
		timeout: delay(CONNECT_TIMEOUT_MS, true),
	});

	if (!error && !timeout) {
		return;
	}

	yield put(setHostIP(null));

	yield put(
		sendNotification({
			message: "multiplayer.code.error",
			type: "error",
		}),
	);
}

export function* setHostInviteCodeSaga() {
	yield takeEvery(setHostInviteCode.match, worker);
}
