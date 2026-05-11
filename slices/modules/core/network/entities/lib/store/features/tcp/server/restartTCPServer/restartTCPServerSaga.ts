import {
	removeAllNetworkClients,
	restartTCPServer,
	selectNetworkRole,
	startTCPServer,
	stopTCPServer,
	tcpServerClosed,
} from "@modules/core/network/shared/lib";
import { log } from "@shared/config/logger";
import {
	delay,
	put,
	race,
	select,
	take,
	takeLeading,
} from "redux-saga/effects";

function* worker() {
	const role: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	if (role !== "host") {
		return;
	}

	yield put(stopTCPServer());
	log.info("restartTCPServer: stopped tcp server");
	const { closed }: { closed?: ReturnType<typeof tcpServerClosed> } =
		yield race({
			closed: take(tcpServerClosed.match),
			timeout: delay(5000),
		});

	// If the port is still held (common during Fast Refresh / network transitions),
	// starting a new server will fail with EADDRINUSE. Skip restart until we see `tcpServerClosed`.
	if (!closed) {
		log.info("restartTCPServer: port still held, skipping restart");
		return;
	}

	log.info("restartTCPServer: port released, restarting server");
	yield put(removeAllNetworkClients());
	yield delay(150);
	yield put(startTCPServer());
	log.info("restartTCPServer: started new server");
}

export function* restartTCPServerSaga() {
	yield takeLeading(restartTCPServer.match, worker);
}
