import { stopTCPClient } from "@modules/core/network/shared/lib";
import {
	selectCurrentRoute,
	setCurrentRoute,
} from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const currentRoute: ReturnType<typeof selectCurrentRoute> =
		yield select(selectCurrentRoute);
	if (currentRoute !== routes.home) {
		return;
	}
	yield put(stopTCPClient());
	/** Do not `setHostIP(null)` — cold start applies `/` route after persist rehydrate and would wipe
	 * the stored LAN IP before Resume; multiplayer entry flows still reset `hostIP` when needed.
	 */
}

export function* stopTCPClientOnHomeSaga() {
	yield takeEvery(setCurrentRoute.match, worker);
}
