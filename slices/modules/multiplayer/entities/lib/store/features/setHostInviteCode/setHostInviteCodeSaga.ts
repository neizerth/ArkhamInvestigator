import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
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

	console.log("ip", ip);
	// yield put(setIP(ip));
}

export function* setHostInviteCodeSaga() {
	yield takeEvery(setHostInviteCode.match, worker);
}
