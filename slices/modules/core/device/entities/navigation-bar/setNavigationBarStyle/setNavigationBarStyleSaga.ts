import { setStyle } from "expo-navigation-bar";
import { call, takeEvery } from "redux-saga/effects";
import { setNavigationBarStyle } from "./setNavigationBarStyle";

function* worker({ payload }: ReturnType<typeof setNavigationBarStyle>) {
	yield call(setStyle, payload);
}

export function* setNavigationBarStyleSaga() {
	yield takeEvery(setNavigationBarStyle.match, worker);
}
