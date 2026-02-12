import { sendTCPActionToServer } from "@modules/core/network/entities/tcp/client/sendTCPActionToServer";
import { sendTCPActionToClient } from "@modules/core/network/entities/tcp/server/sendTCPActionToClient";
import {
	selectHostIp,
	selectNetworkRole,
} from "@modules/core/network/shared/lib";
import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { isAction } from "@reduxjs/toolkit";
import { log } from "@shared/config";
import { hasProp } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (
	action: unknown,
): action is NetworkOutcomeAction<unknown> => {
	if (!isAction(action)) {
		return false;
	}
	if (!hasProp(action, "meta")) {
		return false;
	}
	if (!hasProp(action.meta, "remote")) {
		return false;
	}
	return Boolean(action.meta.remote);
};

function* worker(action: NetworkOutcomeAction<unknown>) {
	const { meta } = action;

	if (meta.notify === "self") {
		return;
	}

	const role: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	const hostIp: ReturnType<typeof selectHostIp> = yield select(selectHostIp);

	if (!role) {
		return;
	}

	const isHost = role === "host";

	if (meta.notify === "host" && isHost) {
		log.info("Host action received. Skipping...");
		return;
	}

	if (!isHost && !hostIp) {
		log.info("No host IP found. Skipping...");
		return;
	}

	const actionCreator = isHost ? sendTCPActionToClient : sendTCPActionToServer;

	yield put(
		actionCreator({
			action,
		}),
	);
}

export function* sendRemoteTCPActionSaga() {
	yield takeEvery(filterAction, worker);
}
