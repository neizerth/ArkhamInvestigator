import { appStarted } from "@modules/core/app/shared/lib";
import type { AppStateStatus } from "react-native";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { deviceAppStateChanged } from "../../shared/lib";
import { createAppStateChannel } from "./createAppStateChannel";

function* worker() {
	const appStateChannel: ReturnType<typeof createAppStateChannel> = yield call(
		createAppStateChannel,
	);
	let currentAppState: AppStateStatus | null = null;

	try {
		while (true) {
			const nextAppState: AppStateStatus = yield take(appStateChannel);
			if (nextAppState !== currentAppState) {
				yield put(deviceAppStateChanged(nextAppState));
				currentAppState = nextAppState;
			}
		}
	} finally {
		appStateChannel.close();
	}
}

export function* initDeviceAppStatusChangeSaga() {
	yield takeEvery(appStarted.match, worker);
}
