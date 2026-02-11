import {
	setHostIp,
	tcpClientSocketConnected,
	tcpClientSocketError,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { put, race, take, takeEvery } from "redux-saga/effects";
import { getHostIPFromInviteCode } from "../../../logic";
import { setHostInviteCode } from "./setHostInviteCode";

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

	console.log("code ip", ip);

	yield put(setHostIp(ip));
	yield put(setGameStatus("initial"));

	const { error }: { error?: ReturnType<typeof tcpClientSocketError> } =
		yield race({
			task: take(tcpClientSocketConnected),
			error: take(tcpClientSocketError),
		});

	if (!error) {
		return;
	}

	yield put(setHostIp(null));

	yield put(
		sendNotification({
			message: "multiplayer.code.error",
			type: "error",
		}),
	);
	return;
}

export function* setHostInviteCodeSaga() {
	yield takeEvery(setHostInviteCode.match, worker);
}
