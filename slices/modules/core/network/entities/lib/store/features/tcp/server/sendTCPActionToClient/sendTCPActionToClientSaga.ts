import { log, tcpLog } from "@modules/core/log/shared/config";
import {
	TCP_CLIENT_CONFIRMATION_ENABLED,
	TCP_CONFIRMATION_MAX_RETRIES,
	TCP_CONFIRMATION_TIMEOUT,
	TCP_RETRY_DELAY,
} from "@modules/core/network/shared/config";
import {
	filterTCPMessageReceived,
	stopTCPServer,
	tcpActionReceived,
} from "@modules/core/network/shared/lib";
import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import type TcpSocket from "react-native-tcp-socket";
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
import { getPayloadClientSockets } from "./lib";
import { sendTCPActionToClient } from "./sendTCPActionToClient";

type Action = ReturnType<typeof sendTCPActionToClient>;

/**
 * Sends action to a single socket. For ACK (tcpActionReceived): fire-and-forget, no wait.
 * For business actions: wait for confirmation with retries.
 */
function* singleSocketWorker(
	action: NetworkOutcomeAction<unknown>,
	socket: TcpSocket.Socket,
): Generator {
	if (socket.destroyed) {
		log.error("TCPClientSocket destroyed");
		return;
	}

	const isAck = tcpActionReceived.match(action);

	if (isAck) {
		// ACK: send once, never wait — so we never block and never consume confirmations from the store
		const messageId = v4();
		yield put(
			sendTCPAction({
				action,
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
		yield put(
			sendTCPAction({
				action,
				socket,
				messageId,
			}),
		);

		if (!TCP_CLIENT_CONFIRMATION_ENABLED) {
			return;
		}

		const filterAction = filterTCPMessageReceived(messageId);

		const { timeout }: { timeout?: boolean } = yield race({
			received: take(filterAction),
			timeout: delay(TCP_CONFIRMATION_TIMEOUT),
		});

		if (!timeout) {
			return;
		}

		tcpLog.info(
			"server: message timed out. Retrying...",
			messageId,
			action.type,
			`(${attempt + 1}/${TCP_CONFIRMATION_MAX_RETRIES})`,
		);

		if (attempt === TCP_CONFIRMATION_MAX_RETRIES - 1) {
			tcpLog.info("server: max retries reached, giving up", action.type);
			return;
		}

		yield delay(TCP_RETRY_DELAY);
	}
}

function* worker(actionArg: Action): Generator {
	const { payload } = actionArg;
	const { action } = payload;

	// Fresh sockets (handles reconnects / destroyed sockets)
	const sockets = getPayloadClientSockets(payload);

	tcpLog.info("Sending action to clients", action.type, sockets.length);

	// Per-socket worker with own messageId: wait for every client's ACK (or give up after retries)
	const tasks = sockets.map((socket) =>
		fork(singleSocketWorker, action, socket),
	);
	yield all(tasks);
}

type CloseableChannel<T> = TakeableChannel<T> & { close: () => void };

const isAckRequest = (action: unknown): action is Action =>
	sendTCPActionToClient.match(action) &&
	tcpActionReceived.match(action.payload.action);

const isBusinessRequest = (action: unknown): action is Action =>
	sendTCPActionToClient.match(action) &&
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
 * an earlier one still mid-retry (audit/multiplayer.md C3, fixed 2026-09-27 — forking let
 * independent per-action retry loops race freely on the wire).
 */
function* processBusinessRequests(
	businessChan: CloseableChannel<Action>,
): Generator {
	while (true) {
		const action: Action = yield take(businessChan);
		if (!action) return;
		yield call(worker, action);
	}
}

function* waitDisconnectAndClose(
	channels: CloseableChannel<Action>[],
): Generator {
	yield take(stopTCPServer.match);
	for (const channel of channels) {
		channel.close();
	}
}

/**
 * Two independent channels off the same `sendTCPActionToClient` action, split by whether the
 * inner action is an ACK: the business channel serializes strictly (see `processBusinessRequests`)
 * while the ACK channel never blocks on it, so a stuck retry can't delay confirming an unrelated
 * message. On stopTCPServer, both channels are closed to clear their queues.
 */
export function* sendTCPActionToClientSaga() {
	while (true) {
		const ackChan: CloseableChannel<Action> = yield actionChannel(isAckRequest);
		const businessChan: CloseableChannel<Action> =
			yield actionChannel(isBusinessRequest);
		yield all([
			call(processAcks, ackChan),
			call(processBusinessRequests, businessChan),
			call(waitDisconnectAndClose, [ackChan, businessChan]),
		]);
	}
}
