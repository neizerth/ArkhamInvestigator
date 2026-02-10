import {
	isTCPAction,
	tcpServerSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpServerSocketDataReceived>) {
	const { data, socket } = payload;

	try {
		const tcpAction = JSON.parse(data);
		if (!isTCPAction(tcpAction)) {
			return;
		}

		const action = {
			...tcpAction,
			meta: {
				...tcpAction.meta,
				source: "tcp",
				socket,
			},
		};

		yield put(action);
	} catch (error) {
		console.error("Error parsing TCP data", error);
	}
}

export function* transformTCPDataToReduxActionSaga() {
	yield takeEvery(tcpServerSocketDataReceived.match, worker);
}
