import { router } from "expo-router";
import { takeEvery } from "redux-saga/effects";
import { goBack } from "./goBack";

function worker() {
	router.back();
}

export function* goBackSaga() {
	yield takeEvery(goBack.match, worker);
}
