import { spawn } from "redux-saga/effects";
import { boardDescriptionSaga } from "./description/sagas";

export function* boardEntitiesSaga() {
	yield spawn(boardDescriptionSaga);
}
