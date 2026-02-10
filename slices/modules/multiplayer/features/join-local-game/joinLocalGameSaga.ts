import { deeplinkRoutes } from "@modules/core/link/shared/config";
import { deeplinkChanged } from "@modules/core/link/shared/lib";
import { setNetworkRole } from "@modules/core/network/shared/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { setHostInviteCode } from "@modules/multiplayer/entities/lib/store/features/setHostInviteCode";
import { routes } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof deeplinkChanged>) {
	const { pathname, query } = payload;

	const { invite } = query;

	if (pathname !== deeplinkRoutes.joinLocalMultiplayer || !invite) {
		return;
	}

	yield put(setNetworkRole("client"));
	yield put(goToPage(routes.startMultiplayer));

	yield put(setHostInviteCode(invite));
}

export function* joinLocalGameSaga() {
	yield takeEvery(deeplinkChanged.match, worker);
}
