import { createPageVisitFilter } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	getTCPServerInstance,
	selectNetworkRole,
	setHostIP,
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "../../../../shared/lib";

function* worker() {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	if (networkRole === "host") {
		yield put(setHostIP(null));

		if (getTCPServerInstance()) {
			return;
		}
		yield put(startTCPServer());
	} else {
		yield put(stopTCPServer());
	}
}

const filterStartMultiplayer = createPageVisitFilter(routes.startMultiplayer);

export function* runTCPServerSaga() {
	yield takeEvery(setNetworkRole.match, worker);
	yield takeEvery(filterStartMultiplayer, worker);
}
