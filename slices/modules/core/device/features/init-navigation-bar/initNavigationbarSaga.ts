import { appStarted } from "@modules/core/app/shared/lib";
import {
	getNavigationBarHeight,
	getNavigationMode,
} from "react-native-navigation-mode";
import { call, put, takeEvery } from "redux-saga/effects";
import { setNavigationBarStyle } from "../../entities/navigation-bar";
import { setNavbarHeight, setNavigationMode } from "../../shared/lib";

import type { ReturnAwaited } from "@shared/model";

function* worker() {
	const navbarHeight: ReturnAwaited<typeof getNavigationBarHeight> = yield call(
		getNavigationBarHeight,
	);
	const navigationMode: ReturnAwaited<typeof getNavigationMode> =
		yield call(getNavigationMode);

	yield put(setNavigationMode(navigationMode));
	yield put(setNavbarHeight(navbarHeight));

	yield put(setNavigationBarStyle("dark"));
}

export function* initNavigationbarSaga() {
	yield takeEvery(appStarted.match, worker);
}
