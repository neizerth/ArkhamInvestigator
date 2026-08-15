import { deeplinkRoutes } from "@modules/core/link/shared/config";
import { deeplinkChanged } from "@modules/core/link/shared/lib";
import { setNetworkRole } from "@modules/core/network/shared/lib";
import {
	createPageVisitFilter,
	goToPage,
} from "@modules/core/router/shared/lib";
import { setHostInviteCode } from "@modules/multiplayer/entities/lib/store/features/setHostInviteCode";
import { routes } from "@shared/config";
import { delay, put, race, take, takeEvery } from "redux-saga/effects";

const NAVIGATION_TIMEOUT_MS = 5000;

function* worker({ payload }: ReturnType<typeof deeplinkChanged>) {
	const { pathname, query } = payload;

	const { invite } = query;

	if (pathname !== deeplinkRoutes.joinLocalMultiplayer || !invite) {
		return;
	}

	yield put(setNetworkRole("client"));
	yield put(goToPage(routes.startMultiplayer));

	/** Navigation is async: the multiplayer route resets the host IP on arrival, so applying
	 * the invite code before that lands would immediately wipe the connection we just started. */
	yield race({
		visited: take(createPageVisitFilter(routes.startMultiplayer)),
		timeout: delay(NAVIGATION_TIMEOUT_MS),
	});

	yield put(setHostInviteCode(invite));
}

export function* joinLocalGameSaga() {
	yield takeEvery(deeplinkChanged.match, worker);
}
