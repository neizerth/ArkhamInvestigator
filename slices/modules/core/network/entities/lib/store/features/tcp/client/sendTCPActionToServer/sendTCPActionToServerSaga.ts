import {
	TCP_CONFIRMATION_MAX_RETRIES,
	TCP_CONFIRMATION_TIMEOUT,
	TCP_RETRY_DELAY,
	TCP_SERVER_CONFIRMATION_ENABLED,
} from "@modules/core/network/shared/config";
import {
	getTCPServerSocket,
	stopTCPClient,
	tcpActionReceived,
} from "@modules/core/network/shared/lib";
import { filterTCPMessageReceived } from "@modules/core/network/shared/lib";
import { log } from "@shared/config";
import type { TakeableChannel } from "redux-saga";
import {
	actionChannel,
	all,
	call,
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
	if (!socket || socket.destroyed) {
		log.error(
			socket
				? "TCPServerSocket destroyed. Skipping action..."
				: "TCPServerSocket not found. Skipping action...",
		);
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

		const filterAction = filterTCPMessageReceived(messageId);

		const { timeout }: { timeout?: boolean } = yield race({
			received: take(filterAction),
			timeout: delay(TCP_CONFIRMATION_TIMEOUT),
		});

		if (!timeout) {
			log.info("client: server received", messageId);
			return;
		}

		log.info(
			"client: server timed out. Retrying...",
			messageId,
			payload.action.type,
			`(${attempt + 1}/${TCP_CONFIRMATION_MAX_RETRIES})`,
		);

		if (attempt === TCP_CONFIRMATION_MAX_RETRIES - 1) {
			log.info("client: max retries reached, giving up", payload.action.type);
			return;
		}

		yield delay(TCP_RETRY_DELAY);
	}
}

type CloseableChannel<T> = TakeableChannel<T> & { close: () => void };

function* processRequests(requestChan: CloseableChannel<Action>): Generator {
	while (true) {
		log.info("client: processing request");
		const action: Action = yield take(requestChan);
		if (!action) {
			log.info("client: no action to process");
			return;
		}
		yield fork(worker, action);
	}
}

function* waitDisconnectAndClose(
	requestChan: CloseableChannel<Action>,
): Generator {
	log.info("client: waiting for stopTCPClient");
	yield take(stopTCPClient.match); //
	log.info("client: disconnecting TCP client");
	requestChan.close();
}

/**
 * actionChannel preserves order. On stopTCPClient, channel is closed to clear queue.
 * Loop creates a new queue after disconnect so client can send again on reconnect.
 */
export function* sendTCPActionToServerSaga() {
	while (true) {
		const requestChan: CloseableChannel<Action> = yield actionChannel(
			sendTCPActionToServer.match,
		);
		yield all([
			call(processRequests, requestChan),
			call(waitDisconnectAndClose, requestChan),
		]);
		log.info("client: starting new queue");
	}
}
