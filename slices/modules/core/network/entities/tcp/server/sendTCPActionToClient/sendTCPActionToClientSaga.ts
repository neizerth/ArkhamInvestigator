import {
	TCP_CONFIRMATION_ENABLED,
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
	call,
	delay,
	put,
	race,
	take,
} from "redux-saga/effects";
import { v4 } from "uuid";
import { sendTCPAction } from "../../sendTCPAction";
import { sendTCPActionToClient } from "./sendTCPActionToClient";

type Action = ReturnType<typeof sendTCPActionToClient>;

function* worker({ payload }: Action) {
	const { action } = payload;

	const sockets =
		payload.type === "single"
			? [getTCPClientSocket(payload.networkId)]
			: getTCPClientSockets();

	log.info("Sending action to clients", action.type, sockets.length);

	for (const socket of sockets) {
		yield call(singleWorker, action, socket);
	}
}

function* singleWorker(
	action: NetworkOutcomeAction<unknown>,
	socket?: TcpSocket.Socket,
): Generator {
	if (!socket) {
		log.error("TCPClientSocket not found");
		return;
	}

	const messageId = v4();

	yield put(
		sendTCPAction({
			action,
			socket,
			messageId,
		}),
	);

	// do not wait for the action to be received if it was already received
	if (tcpActionReceived.match(action)) {
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

	const { type } = action;

	if (!timeout) {
		// message was recieved
		return;
	}

	log.info("server: message timed out. Retrying...", messageId, type);

	yield delay(TCP_RETRY_DELAY);
	yield call(singleWorker, action, socket);
}

export function* sendTCPActionToClientSaga() {
	const requestChan: TakeableChannel<Action> = yield actionChannel(
		sendTCPActionToClient.match,
	);
	while (true) {
		const action: Action = yield take(requestChan);
		yield call(worker, action);
	}
}
