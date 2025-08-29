import { spawn } from "redux-saga/effects";
import { updateBoardBackgroundSaga } from "./updateBoardBackground/updateBoardBackgroundSaga";

export function* boardBackgroundEntitiesSaga() {
	yield spawn(updateBoardBackgroundSaga);
}
