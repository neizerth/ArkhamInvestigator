import { createPageVisitFilter } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { log } from "@shared/config/logger";
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
	log.info("checking network role", networkRole);

	if (networkRole === "host") {
		log.info("setting host ip to null");
		yield put(setHostIP(null));

		if (getTCPServerInstance()) {
			log.info("tcp server already running, skipping start");
			return;
		}
		yield put(startTCPServer());
	} else if (networkRole === "client") {
		yield put(stopTCPServer());
	}
}

const filterStartMultiplayer = createPageVisitFilter(routes.startMultiplayer);

export function* runTCPServerSaga() {
	yield takeEvery(setNetworkRole.match, worker);
	yield takeEvery(filterStartMultiplayer, worker);
}
