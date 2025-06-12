import { spawn } from "redux-saga/effects";
import { watchChangeBoardPropSaga } from "./changeBoardPropSaga";
import { watchChangeBoardPropValueSaga } from "./changeBoardPropValueSaga";
import { watchChangeBoardValueSaga } from "./changeBoardValueSaga";

export function* boardSaga() {
	yield spawn(watchChangeBoardPropSaga);
	yield spawn(watchChangeBoardValueSaga);
	yield spawn(watchChangeBoardPropValueSaga);
}
