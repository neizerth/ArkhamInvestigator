import { appStarted } from "@modules/core/app/shared/lib";
import { refresh as refreshNetworkInfo } from "@react-native-community/netinfo";
import { Platform } from "react-native";
import { call, takeEvery } from "redux-saga/effects";
import { requestFineLocation } from "./requestFineLocation";

export function* worker() {
	if (Platform.OS !== "android") {
		return;
	}

	const granted: boolean = yield call(requestFineLocation);
	if (granted) {
		yield call(refreshNetworkInfo);
	}
}

export function* initAndroidNetworkingSaga() {
	yield takeEvery(appStarted.match, worker);
}
