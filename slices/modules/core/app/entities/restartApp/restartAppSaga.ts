import RNRestart from "react-native-restart";
import { takeEvery } from "redux-saga/effects";
import { restartApp } from "./restartApp";

function worker() {
	RNRestart.restart();
}

export function* restartAppSaga() {
	yield takeEvery(restartApp.match, worker);
}
