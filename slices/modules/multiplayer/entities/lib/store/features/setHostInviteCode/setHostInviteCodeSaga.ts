import { selectIP } from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { getHostIPFromInviteCode } from "../../../logic";
import { setHostInviteCode } from "./setHostInviteCode";

function* worker({ payload }: ReturnType<typeof setHostInviteCode>) {
	const myIP: ReturnType<typeof selectIP> = yield select(selectIP);
	const ip = getHostIPFromInviteCode(payload);
	if (!ip) {
		yield put(
			sendNotification({
				message: "multiplayer.error.invalidInviteCode",
				type: "error",
			}),
		);
		return;
	}
	if (ip === myIP) {
		yield put(
			sendNotification({
				message: "multiplayer.error.selfInviteCode",
				type: "error",
			}),
		);
		return;
	}

	console.log("ip", ip);
	// yield put(setIP(ip));
}

export function* setHostInviteCodeSaga() {
	yield takeEvery(setHostInviteCode.match, worker);
}
