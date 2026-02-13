import { call, cancelled, put, race, select, take } from "redux-saga/effects";
import {
	selectNickname,
	startTCPServer,
	stopTCPServer,
	tcpServerClosed,
} from "../../../../shared/lib";
import {
	type TCPServerChannelAction,
	createTCPServerChannel,
} from "./createTCPServerChannel";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const channel: ReturnType<typeof createTCPServerChannel> = yield call(
		createTCPServerChannel,
		nickname,
	);

	try {
		while (true) {
			const action: TCPServerChannelAction = yield take(channel); // Wait for events from TCP
			yield put(action); // Forward event to Redux Store
			if (tcpServerClosed.match(action)) {
				return;
			}
		}
	} finally {
		// Runs when the saga is cancelled
		const isCancelled: boolean = yield cancelled();
		if (isCancelled) {
			channel.close(); // Close the channel and the server
		}
	}
}

export function* stopWorker() {}

export function* runTCPServerSaga() {
	while (true) {
		yield take(startTCPServer.match);
		// race cancels tcpWorker if stopTCPServer is dispatched first
		const { stop }: { stop?: ReturnType<typeof stopTCPServer> } = yield race({
			task: call(worker),
			stop: take(stopTCPServer.match),
		});

		if (stop) {
			yield call(stopWorker);
		}
	}
}
