import { fork } from "redux-saga/effects";
import { getCluesSaga } from "./getClues/getCluesSaga";

export function* boardBaseEntitiesSaga() {
	yield fork(getCluesSaga);
}
