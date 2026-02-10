import { call, cancelled, put, race, take } from "redux-saga/effects";
import { startTCPClient, stopTCPClient } from "../../../shared/lib";
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
		}
	} finally {
		const isCancelled: boolean = yield cancelled();
		if (isCancelled) {
			channel.close();
		}
	}
}

export function* runTCPClientSaga() {
	while (true) {
		const action: ReturnType<typeof startTCPClient> = yield take(
			startTCPClient.match,
		);
		yield race({
			task: call(worker, action),
			cancel: take(stopTCPClient.match),
		});
	}
}
