import { callEvery, seconds } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

import { appStateChanged } from "@modules/core/app/shared/lib";
import { checkTCPClientConnection } from "../../entities/tcp/client/checkTCPClientConnection";

const filterAppStateAction = (action: unknown) => {
	if (!appStateChanged.match(action)) {
		return false;
	}
	return action.payload === "active";
};

function* worker() {
	yield put(checkTCPClientConnection());
}

export function* sendNetworkClientKeepAliveSaga() {
	yield callEvery(seconds(20), worker);
	yield takeEvery(filterAppStateAction, worker);
}
