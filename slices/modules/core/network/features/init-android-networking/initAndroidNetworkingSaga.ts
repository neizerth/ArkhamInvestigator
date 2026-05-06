import { setCurrentRoute } from "@modules/core/router/shared/lib";
import { refresh as refreshNetworkInfo } from "@react-native-community/netinfo";
import { routes } from "@shared/config";
import { Platform } from "react-native";
import { call, takeEvery } from "redux-saga/effects";
import { requestFineLocation } from "./requestFineLocation";

const filterAction = (action: unknown) => {
	if (!setCurrentRoute.match(action)) {
		return false;
	}
	return action.payload === routes.startMultiplayer;
};

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
	yield takeEvery(filterAction, worker);
}
