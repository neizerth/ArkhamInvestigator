import { call, cancelled, put, race, select, take } from "redux-saga/effects";
import {
	selectNickname,
	startTCPServer,
	stopTCPServer,
} from "../../shared/lib";
import { type TCPChannelAction, createTCPChannel } from "./createTCPChannel";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const channel: ReturnType<typeof createTCPChannel> = yield call(
		createTCPChannel,
		nickname,
	);

	try {
		while (true) {
			const action: TCPChannelAction = yield take(channel); // Wait for events from TCP
			yield put(action); // Forward event to Redux Store
		}
	} finally {
		// Runs when the saga is cancelled
		const isCancelled: boolean = yield cancelled();
		if (isCancelled) {
			channel.close(); // Close the channel and the server
		}
	}
}

export function* runTCPServerSaga() {
	while (true) {
		yield take(startTCPServer.match);
		// race cancels tcpWorker if stopTCPServer is dispatched first
		yield race({
			task: call(worker),
			cancel: take(stopTCPServer.match),
		});
	}
}
