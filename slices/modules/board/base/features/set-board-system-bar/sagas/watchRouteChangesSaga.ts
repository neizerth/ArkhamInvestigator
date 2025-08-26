import { routeChanged } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { SystemBars } from "react-native-edge-to-edge";
import { put, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

function* worker({ payload }: ReturnType<typeof routeChanged>) {
	if (payload === routes.board) {
		yield put(setBoardSystemBar("current"));
		return;
	}

	SystemBars.setStyle("light");
}

export function* watchRouteChangesSaga() {
	yield takeEvery(routeChanged.match, worker);
}
