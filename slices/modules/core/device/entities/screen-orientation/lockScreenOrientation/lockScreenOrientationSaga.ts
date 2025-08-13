import { put, takeEvery } from "redux-saga/effects";
import {
	lockScreenOrientation,
	screenOrientationLocked,
} from "./lockScreenOrientation";

import * as ScreenOrientation from "expo-screen-orientation";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

function* worker({ payload }: ReturnType<typeof lockScreenOrientation>) {
	if (isWeb) {
		return;
	}
	ScreenOrientation.lockAsync(payload);
	yield put(screenOrientationLocked(payload));
}

export function* lockScreenOrientationSaga() {
	yield takeEvery(lockScreenOrientation.match, worker);
}
