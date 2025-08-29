import { spawn } from "redux-saga/effects";
import { boardBackgroundEntitiesSaga } from "./background/sagas";
import { boardDescriptionSaga } from "./description/sagas";

export function* boardEntitiesSaga() {
	yield spawn(boardDescriptionSaga);
	yield spawn(boardBackgroundEntitiesSaga);
}
