import { createPageVisitFilter } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { log } from "@shared/config/logger";
import { put, select, takeEvery, takeLeading } from "redux-saga/effects";
import {
	getTCPServerInstance,
	restartTCPServer,
	selectHostRunning,
	selectNetworkRole,
	setHostIP,
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
} from "../../../../shared/lib";

function* worker(action: unknown) {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	log.info("checking network role", networkRole);

	if (networkRole === "host") {
		log.info("setting host ip to null");
		yield put(setHostIP(null));

		const instanceExists = Boolean(getTCPServerInstance());
		const hostRunning: ReturnType<typeof selectHostRunning> =
			yield select(selectHostRunning);
		const pageVisit = filterStartMultiplayer(action);

		if (pageVisit) {
			// Revisiting start-multiplayer while already hosting must not start a second bind:
			// `getTCPServerInstance()` is set before `listening`, so a duplicate route dispatch
			// used to hit `clearTCPServerInstance` + `startTCPServer` and race EADDRINUSE.
			if (instanceExists && hostRunning) {
				return;
			}
			if (instanceExists && !hostRunning) {
				return;
			}
			yield put(startTCPServer());
			return;
		}

		if (instanceExists && hostRunning) {
			// Host→client→host does a full stop/start; role-driven host entry may need a clean bind.
			log.info(
				"tcp server already running — scheduling restart for clean listen/zeroconf",
			);
			yield put(restartTCPServer());
			return;
		}

		if (instanceExists && !hostRunning) {
			// Startup in progress (instance set before `tcpServerListening`); do not churn.
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
	yield takeLeading(filterStartMultiplayer, worker);
}
