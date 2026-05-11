import { call, cancelled, put, race, select, take } from "redux-saga/effects";
import {
	clearTCPServerInstance,
	getTCPServerInstance,
	selectNickname,
	setHostRunning,
	startTCPServer,
	stopTCPServer,
	tcpServerClosed,
	tcpServerListening,
} from "../../../../../../../shared/lib";
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
			if (tcpServerListening.match(action)) {
				// Keep flags in sync even if the channel is torn down mid-queue (cancel races).
				yield put(setHostRunning(true));
			}
			if (tcpServerClosed.match(action)) {
				yield put(setHostRunning(false));
				return;
			}
		}
	} finally {
		channel.close();
		const isCancelled: boolean = yield cancelled();
		// Cancel stops the worker mid-loop; `server.on('close')` then emits after the eventChannel
		// unsubscribes, so Redux never receives `tcpServerClosed`. Flush explicitly on cancel only.
		if (isCancelled) {
			yield put(setHostRunning(false));
			yield put(tcpServerClosed());
		}
	}
}

export function* stopWorker() {}

/** Between TCP sessions we only `take(startTCPServer)`; idle `stopTCPServer` was dropped and native listeners leaked. */
function* idleStopFlush() {
	if (getTCPServerInstance()) {
		clearTCPServerInstance();
	}
	yield put(setHostRunning(false));
}

export function* runTCPServerSaga() {
	while (true) {
		const idleRaceResult: {
			start?: ReturnType<typeof startTCPServer>;
			stopWhileIdle?: ReturnType<typeof stopTCPServer>;
		} = yield race({
			start: take(startTCPServer.match),
			stopWhileIdle: take(stopTCPServer.match),
		});

		if ("stopWhileIdle" in idleRaceResult && idleRaceResult.stopWhileIdle) {
			yield call(idleStopFlush);
			continue;
		}

		const { stop }: { stop?: ReturnType<typeof stopTCPServer> } = yield race({
			task: call(worker),
			stop: take(stopTCPServer.match),
		});

		if (stop) {
			yield call(stopWorker);
		}
	}
}
