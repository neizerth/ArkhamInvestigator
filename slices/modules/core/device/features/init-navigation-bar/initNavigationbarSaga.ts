import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import { Platform } from "react-native";
import {
	getNavigationBarHeight,
	getNavigationMode,
} from "react-native-navigation-mode";
import { call, put, takeEvery } from "redux-saga/effects";
import { setNavigationBarStyle } from "../../entities/navigation-bar";
import {
	deviceAppStateChanged,
	setNavbarHeight,
	setNavigationMode,
} from "../../shared/lib";

import type { ReturnAwaited } from "@shared/model";

/**
 * Since API 30 the native module measures the real `navigationBars` window
 * inset, which is 0 exactly when there is no on-screen navigation bar. Below
 * that it falls back to the `navigation_bar_height` resource, which is
 * non-zero even on devices with hardware buttons.
 */
const MEASURED_INSET_SDK = 30;

function* syncNavigationBar() {
	const defaultNavbarHeight: ReturnAwaited<typeof getNavigationBarHeight> =
		yield call(getNavigationBarHeight);
	const navigationMode: ReturnAwaited<typeof getNavigationMode> =
		yield call(getNavigationMode);

	yield put(setNavigationMode(navigationMode));

	const measuredHeight = Math.max(
		defaultNavbarHeight || 0,
		navigationMode.navigationBarHeight || 0,
		0,
	);

	// `type` comes from the `config_navBarInteractionMode` framework resource,
	// which is missing on some devices and on API < 29 - there it reads
	// "unknown" even though an on-screen bar is present. Treating that as a
	// physical navbar dropped every inset that depends on this value, so the
	// measured inset wins wherever it is trustworthy.
	const trustMeasuredHeight =
		Platform.OS === "android" && Number(Platform.Version) >= MEASURED_INSET_SDK;

	const physicalNavbar =
		navigationMode.type === "unknown" || !navigationMode.type;

	const navbarHeight =
		trustMeasuredHeight || !physicalNavbar ? measuredHeight : 0;

	yield put(setNavbarHeight(navbarHeight));
}

function* worker() {
	yield call(syncNavigationBar);

	yield put(setNavigationBarStyle("light"));
}

function* appStateWorker({
	payload,
}: ReturnType<typeof deviceAppStateChanged>) {
	if (payload !== "active") {
		return;
	}

	// The navigation mode can be switched in system settings while the app sits
	// in the background, so re-measure the inset every time it comes back.
	yield call(syncNavigationBar);
}

export function* initNavigationbarSaga() {
	yield takeOnce(appStarted.match, worker);
	yield takeEvery(deviceAppStateChanged.match, appStateWorker);
}
