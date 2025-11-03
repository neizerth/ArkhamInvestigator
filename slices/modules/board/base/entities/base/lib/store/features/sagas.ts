import { fork } from "redux-saga/effects";
import { getCluesSaga } from "./getClues/getCluesSaga";
import { getResourcesSaga } from "./getResources/getResourcesSaga";

export function* boardBaseEntitiesSaga() {
	yield fork(getCluesSaga);
	yield fork(getResourcesSaga);
}
