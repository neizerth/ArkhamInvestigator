import { nicknameChanged } from "@modules/core/network/entities/changeNickname";
import {
	selectNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import { removeAllNetworkClients } from "@modules/core/network/shared/lib/store/networkClient";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof nicknameChanged>) {
	const role: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (role !== "host") {
		return;
	}

	const name = payload.oldValue;

	if (name) {
		yield put(
			stopTCPServer({
				name,
			}),
		);
	}

	yield put(removeAllNetworkClients());

	yield put(startTCPServer());
}

export function* restartTCPServerOnNicknameChangeSaga() {
	yield takeEvery(nicknameChanged.match, worker);
}
