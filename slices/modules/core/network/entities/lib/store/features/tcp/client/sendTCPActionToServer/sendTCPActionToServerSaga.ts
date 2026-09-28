import { log, tcpLog } from "@modules/core/log/shared/config";
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
		tcpLog.info("client: sending action", payload.action.type, messageId);
		yield put(
			sendTCPAction({
				...payload,
				socket,
				messageId,
			}),
		);
		return;
	}

	// One id per logical message, reused across retries: the receiver deduplicates by it, so a
	// retransmission after a lost ACK is confirmed without applying the action twice.
	const messageId = v4();

	for (let attempt = 0; attempt < TCP_CONFIRMATION_MAX_RETRIES; attempt++) {
		const s = getTCPServerSocket();
		if (!s || s.destroyed) {
			log.error("TCPServerSocket not available. Skipping action...");
			return;
		}

		tcpLog.info("client: sending action", payload.action.type, messageId);
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
			tcpLog.info("client: server received", messageId);
			return;
		}

		tcpLog.info(
			"client: server timed out. Retrying...",
			messageId,
			payload.action.type,
			`(${attempt + 1}/${TCP_CONFIRMATION_MAX_RETRIES})`,
		);

		if (attempt === TCP_CONFIRMATION_MAX_RETRIES - 1) {
			tcpLog.info(
				"client: max retries reached, giving up",
				payload.action.type,
			);
			return;
		}

		yield delay(TCP_RETRY_DELAY);
	}
}

type CloseableChannel<T> = TakeableChannel<T> & { close: () => void };

const isAckRequest = (action: unknown): action is Action =>
	sendTCPActionToServer.match(action) &&
	tcpActionReceived.match(action.payload.action);

const isBusinessRequest = (action: unknown): action is Action =>
	sendTCPActionToServer.match(action) &&
	!tcpActionReceived.match(action.payload.action);

/** ACKs fork immediately: fire-and-forget, must never wait behind a business action's retries. */
function* processAcks(ackChan: CloseableChannel<Action>): Generator {
	while (true) {
		const action: Action = yield take(ackChan);
		if (!action) return;
		yield fork(worker, action);
	}
}

/**
 * Business actions are `call`ed (awaited), not forked, on their OWN channel: this genuinely
 * serializes them one at a time, including their retries, so a later action can no longer overtake
 * an earlier one still mid-retry — same C3 fix (audit/multiplayer.md) applied 2026-09-27 to the
 * server's mirror of this saga (sendTCPActionToClientSaga), missed here until now: this client-side
 * saga had the identical `fork`-per-action bug for the client-to-host direction.
 */
function* processBusinessRequests(
	businessChan: CloseableChannel<Action>,
): Generator {
	while (true) {
		tcpLog.info("client: processing request");
		const action: Action = yield take(businessChan);
		if (!action) {
			tcpLog.info("client: no action to process");
			return;
		}
		yield call(worker, action);
	}
}

function* waitDisconnectAndClose(
	channels: CloseableChannel<Action>[],
): Generator {
	tcpLog.info("client: waiting for stopTCPClient");
	yield take(stopTCPClient.match);
	tcpLog.info("client: disconnecting TCP client");
	for (const channel of channels) {
		channel.close();
	}
}

/**
 * Two independent channels off the same `sendTCPActionToServer` action, split by whether the inner
 * action is an ACK: the business channel serializes strictly (see `processBusinessRequests`) while
 * the ACK channel never blocks on it. On stopTCPClient, both channels are closed to clear their
 * queues. Loop creates fresh channels after disconnect so the client can send again on reconnect.
 */
export function* sendTCPActionToServerSaga() {
	while (true) {
		const ackChan: CloseableChannel<Action> = yield actionChannel(isAckRequest);
		const businessChan: CloseableChannel<Action> =
			yield actionChannel(isBusinessRequest);
		yield all([
			call(processAcks, ackChan),
			call(processBusinessRequests, businessChan),
			call(waitDisconnectAndClose, [ackChan, businessChan]),
		]);
		tcpLog.info("client: starting new queue");
	}
}
