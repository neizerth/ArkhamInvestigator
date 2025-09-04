import { setStyle } from "expo-navigation-bar";
import { Platform } from "react-native";
import { call, takeEvery } from "redux-saga/effects";
import { setNavigationBarStyle } from "./setNavigationBarStyle";

function* worker({ payload }: ReturnType<typeof setNavigationBarStyle>) {
	if (Platform.OS !== "android") {
		return;
	}
	yield call(setStyle, payload);
}

export function* setNavigationBarStyleSaga() {
	yield takeEvery(setNavigationBarStyle.match, worker);
}
