import {
	TCP_CONFIRMATION_ENABLED,
	TCP_CONFIRMATION_TIMEOUT,
	TCP_RETRY_DELAY,
} from "@modules/core/network/shared/config";
import {
	getTCPServerSocket,
	tcpActionReceived,
} from "@modules/core/network/shared/lib";
import { filterTCPMessageRecieved } from "@modules/core/network/shared/lib/store/util/filterTCPMessageRecieved";
import { log } from "@shared/config";
import type { TakeableChannel } from "redux-saga";
import {
	actionChannel,
	call,
	delay,
	put,
	race,
	take,
} from "redux-saga/effects";
import { v4 } from "uuid";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPActionToServer } from "./sendTCPActionToServer";

type Action = ReturnType<typeof sendTCPActionToServer>;

function* worker(action: Action): Generator {
	const { payload } = action;
	const socket = getTCPServerSocket();

	if (!socket) {
		log.error("TCPServerSocket not found. Skipping action...");
		return;
	}

	if (socket.destroyed) {
		log.error("TCPServerSocket destroyed. Skipping action...");
		return;
	}

	const messageId = v4();

	yield put(
		sendTCPAction({
			...payload,
			socket,
			messageId,
		}),
	);

	if (tcpActionReceived.match(payload.action)) {
		return;
	}

	if (!TCP_CONFIRMATION_ENABLED) {
		return;
	}

	const filterAction = filterTCPMessageRecieved(messageId);

	const { timeout }: { timeout?: boolean } = yield race({
		recievied: take(filterAction),
		timeout: delay(TCP_CONFIRMATION_TIMEOUT),
	});

	if (!timeout) {
		log.info("client: server recieved", messageId);
		return;
	}

	log.info("client: server timed out. Retrying...", payload.action.type);

	yield delay(TCP_RETRY_DELAY);
	yield call(worker, action);
}

export function* sendTCPActionToServerSaga() {
	const requestChan: TakeableChannel<Action> = yield actionChannel(
		sendTCPActionToServer.match,
	);
	while (true) {
		const action: Action = yield take(requestChan);
		yield call(worker, action);
	}
}
