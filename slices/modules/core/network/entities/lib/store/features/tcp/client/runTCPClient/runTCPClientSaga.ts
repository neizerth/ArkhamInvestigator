import {
	call,
	cancelled,
	put,
	race,
	take,
	takeLatest,
} from "redux-saga/effects";
import {
	startTCPClient,
	stopTCPClient,
	tcpClientSocketClosed,
} from "../../../../../../../shared/lib";
import {
	type TCPClientChannelAction,
	createTCPClientChannel,
} from "./createTCPClientChannel";

function* worker({ payload }: ReturnType<typeof startTCPClient>) {
	const { host } = payload;
	const channel: ReturnType<typeof createTCPClientChannel> = yield call(
		createTCPClientChannel,
		host,
	);

	try {
		while (true) {
			const action: TCPClientChannelAction = yield take(channel);
			yield put(action);
			if (tcpClientSocketClosed.match(action)) {
				return;
			}
		}
	} finally {
		const isCancelled: boolean = yield cancelled();
		if (isCancelled) {
			channel.close();
		}
	}
}

function* runWorkerWithCancel(
	action: ReturnType<typeof startTCPClient>,
): Generator {
	yield race({
		task: call(worker, action),
		cancel: take(stopTCPClient.match),
	});
}

export function* runTCPClientSaga() {
	yield takeLatest(startTCPClient.match, runWorkerWithCancel);
}
