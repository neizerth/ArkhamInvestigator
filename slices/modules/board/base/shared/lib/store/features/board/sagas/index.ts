import { spawn } from "redux-saga/effects";
import { watchChangeBoardPropSaga } from "./changeBoardPropSaga";

export function* boardSaga() {
	yield spawn(watchChangeBoardPropSaga);
}
