import {
	isTCPIncomeAction,
	setTCPClientSocket,
	tcpActionReceived,
	tcpServerSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpServerSocketDataReceived>) {
	const { data, socket } = payload;

	try {
		const tcpAction = JSON.parse(data);

		if (!isTCPIncomeAction(tcpAction)) {
			return;
		}

		const { networkId } = tcpAction.meta;

		setTCPClientSocket(networkId, socket);

		const action = {
			...tcpAction,
			meta: {
				...tcpAction.meta,
				notify: "self",
				source: "tcp",
				socket,
			},
		};

		yield put(action);

		const { messageId } = tcpAction.meta;

		yield put(
			tcpActionReceived({
				messageId,
			}),
		);
	} catch (error) {
		console.error("Error parsing TCP data", error);
	}
}

export function* transformServerTCPDataToActionSaga() {
	yield takeEvery(tcpServerSocketDataReceived.match, worker);
}
