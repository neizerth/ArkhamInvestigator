import { tcpServerSocketDataReceived } from "@modules/core/network/shared/lib";
import { isAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpServerSocketDataReceived>) {
	const { data } = payload;

	try {
		const action = JSON.parse(data);
		if (isAction(action)) {
			console.log("transforming action", action);
			yield put({
				...action,
				meta: {
					network: true,
					source: "tcp",
				},
			});
		}
	} catch (error) {
		console.error("Error parsing TCP data", error);
	}
}

export function* transformTCPDataToReduxActionSaga() {
	yield takeEvery(tcpServerSocketDataReceived.match, worker);
}
