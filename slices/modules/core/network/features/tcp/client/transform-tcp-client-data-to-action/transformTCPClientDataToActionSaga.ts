import {
	getTCPServerSocket,
	isTCPIncomeAction,
	tcpClientSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpClientSocketDataReceived>) {
	const { data } = payload;

	const socket = getTCPServerSocket();

	try {
		const tcpAction = JSON.parse(data);
		if (!isTCPIncomeAction(tcpAction)) {
			return;
		}

		// const meta = tcpAction.meta

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

export function* transformTCPClientDataToActionSaga() {
	yield takeEvery(tcpClientSocketDataReceived.match, worker);
}
