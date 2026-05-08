import { getGlobalValue, setGlobalValue } from "@shared/lib/util/global";
import { spawn } from "redux-saga/effects";
import { tcpClientSagas } from "./client/sagas";
import { commonTcpSagas } from "./common/sagas";
import { tcpServerSagas } from "./server/sagas";

const TCP_SAGAS_GUARD_KEY = "__arkham_tcpSagasStarted__";

export function* tcpSagas() {
	// Fast Refresh/HMR can re-run module init without cancelling old sagas.
	// Guard so we only spawn once per app runtime.
	if (getGlobalValue<boolean>(TCP_SAGAS_GUARD_KEY)) {
		return;
	}
	setGlobalValue(TCP_SAGAS_GUARD_KEY, true);

	yield spawn(tcpServerSagas);
	yield spawn(tcpClientSagas);
	yield spawn(commonTcpSagas);
}
