import {
	TCP_CLIENT_CONFIRMATION_ENABLED,
	TCP_CONFIRMATION_MAX_RETRIES,
	TCP_CONFIRMATION_TIMEOUT,
	TCP_RETRY_DELAY,
} from "@modules/core/network/shared/config";
import {
	getTCPClientSocket,
	getTCPClientSockets,
	tcpActionReceived,
} from "@modules/core/network/shared/lib";
import { filterTCPMessageRecieved } from "@modules/core/network/shared/lib/store/util/filterTCPMessageRecieved";
import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { log } from "@shared/config";
import type TcpSocket from "react-native-tcp-socket";
import type { TakeableChannel } from "redux-saga";
import {
	actionChannel,
	all,
	delay,
	fork,
	put,
	race,
	take,
} from "redux-saga/effects";
import { v4 } from "uuid";
import { sendTCPAction } from "../../sendTCPAction";
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

	for (let attempt = 0; attempt < TCP_CONFIRMATION_MAX_RETRIES; attempt++) {
		const messageId = v4();

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

		const filterAction = filterTCPMessageRecieved(messageId);

		const { timeout }: { timeout?: boolean } = yield race({
			recievied: take(filterAction),
			timeout: delay(TCP_CONFIRMATION_TIMEOUT),
		});

		if (!timeout) {
			return;
		}

		log.info(
			"server: message timed out. Retrying...",
			messageId,
			action.type,
			`(${attempt + 1}/${TCP_CONFIRMATION_MAX_RETRIES + 1})`,
		);

		if (attempt === TCP_CONFIRMATION_MAX_RETRIES) {
			log.info("server: max retries reached, giving up", action.type);
			return;
		}

		yield delay(TCP_RETRY_DELAY);
	}
}

function* worker(actionArg: Action): Generator {
	const { payload } = actionArg;
	const { action } = payload;

	// Fresh sockets (handles reconnects / destroyed sockets)
	const socketsRaw =
		payload.type === "single"
			? [getTCPClientSocket(payload.networkId)]
			: getTCPClientSockets();

	const sockets = socketsRaw.filter(
		(s): s is TcpSocket.Socket => s !== undefined && !s.destroyed,
	);

	log.info("Sending action to clients", action.type, sockets.length);

	// Per-socket worker with own messageId: wait for every client's ACK (or give up after retries)
	const tasks = sockets.map((socket) =>
		fork(singleSocketWorker, action, socket),
	);
	yield all(tasks);
}

/**
 * actionChannel preserves processing order. We always fork(worker) — never call —
 * so the channel is never blocked. ACKs are fire-and-forget inside the worker,
 * so they never run take() and never "steal" confirmations meant for business workers.
 */
export function* sendTCPActionToClientSaga() {
	const requestChan: TakeableChannel<Action> = yield actionChannel(
		sendTCPActionToClient.match,
	);
	while (true) {
		const action: Action = yield take(requestChan);
		// ACK: fork so it flies out immediately and does not block the channel.
		// Business: fork too so channel stays unblocked; worker waits for confirmation inside.
		yield fork(worker, action);
	}
}
