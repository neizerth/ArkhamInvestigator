import {
	TCP_CONFIRMATION_MAX_RETRIES,
	TCP_CONFIRMATION_TIMEOUT,
	TCP_RETRY_DELAY,
	TCP_SERVER_CONFIRMATION_ENABLED,
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
	delay,
	fork,
	put,
	race,
	take,
} from "redux-saga/effects";
import { v4 } from "uuid";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPActionToServer } from "./sendTCPActionToServer";

type Action = ReturnType<typeof sendTCPActionToServer>;

function* worker(actionArg: Action): Generator {
	const { payload } = actionArg;
	const isAck = tcpActionReceived.match(payload.action);

	const socket = getTCPServerSocket();
	if (!socket) {
		log.error("TCPServerSocket not found. Skipping action...");
		return;
	}
	if (socket.destroyed) {
		log.error("TCPServerSocket destroyed. Skipping action...");
		return;
	}

	if (isAck) {
		// ACK: fire-and-forget — send once, never wait; frees the channel for next action
		const messageId = v4();
		log.info("client: sending action", payload.action.type, messageId);
		yield put(
			sendTCPAction({
				...payload,
				socket,
				messageId,
			}),
		);
		return;
	}

	for (let attempt = 0; attempt < TCP_CONFIRMATION_MAX_RETRIES; attempt++) {
		const s = getTCPServerSocket();
		if (!s || s.destroyed) {
			log.error("TCPServerSocket not available. Skipping action...");
			return;
		}

		const messageId = v4();

		log.info("client: sending action", payload.action.type, messageId);
		yield put(
			sendTCPAction({
				...payload,
				socket: s,
				messageId,
			}),
		);

		if (!TCP_SERVER_CONFIRMATION_ENABLED) {
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

		log.info(
			"client: server timed out. Retrying...",
			messageId,
			payload.action.type,
			`(${attempt + 1}/${TCP_CONFIRMATION_MAX_RETRIES + 1})`,
		);

		if (attempt === TCP_CONFIRMATION_MAX_RETRIES) {
			log.info("client: max retries reached, giving up", payload.action.type);
			return;
		}

		yield delay(TCP_RETRY_DELAY);
	}
}

/**
 * actionChannel preserves order. Always fork(worker) — never call — so the channel
 * is never blocked (ACKs can be taken immediately) → no deadlock.
 */
export function* sendTCPActionToServerSaga() {
	const requestChan: TakeableChannel<Action> = yield actionChannel(
		sendTCPActionToServer.match,
	);
	while (true) {
		const action: Action = yield take(requestChan);
		yield fork(worker, action);
	}
}
