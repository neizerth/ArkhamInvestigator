import { Platform } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { call, takeEvery } from "redux-saga/effects";
import { setStatusBarStyle } from "./setStatusBarStyle";

function* worker({ payload }: ReturnType<typeof setStatusBarStyle>) {
	if (Platform.OS !== "android") {
		return;
	}
	yield call(SystemBars.setStyle, payload);
}

export function* setStatusBarStyleSaga() {
	yield takeEvery(setStatusBarStyle.match, worker);
}
