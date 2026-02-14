import { sendTCPActionToServer } from "@modules/core/network/entities/lib/store/features/tcp/client/sendTCPActionToServer";
import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient";
import {
	selectHostIp,
	selectNetworkRole,
	sendRemoteAction,
} from "@modules/core/network/shared/lib";
import type {
	NetworkOutcomeAction,
	NetworkOutcomeActionMeta,
} from "@modules/core/network/shared/model";
import { type PayloadAction, isAction } from "@reduxjs/toolkit";
import { log } from "@shared/config";
import { hasProp } from "@shared/lib";
import { omit } from "ramda";
import type TcpSocket from "react-native-tcp-socket";
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

type Meta = NetworkOutcomeActionMeta & {
	socket?: TcpSocket.Socket;
};

function* actionWorker(action: PayloadAction<unknown, string, Meta>) {
	const { meta } = action;

	if (meta.notify === "self") {
		log.info("Self action received. Skipping...");
		return;
	}

	const role: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	const hostIp: ReturnType<typeof selectHostIp> = yield select(selectHostIp);

	if (!role) {
		log.info("No network role found. Skipping...");
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
	log.info("Sending action to", action.type);

	const remoteAction = {
		...action,
		meta: omit(["socket"], meta),
	};

	yield put(
		actionCreator({
			action: remoteAction,
		}),
	);
}

function* remoteActionWorker({ payload }: ReturnType<typeof sendRemoteAction>) {
	const { action } = payload;
	yield put(action);
}

export function* sendRemoteTCPActionSaga() {
	yield takeEvery(filterAction, actionWorker);
	yield takeEvery(sendRemoteAction.match, remoteActionWorker);
}
