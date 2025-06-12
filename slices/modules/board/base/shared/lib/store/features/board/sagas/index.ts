import { spawn } from "redux-saga/effects";
import { watchChangeBoardPartSaga } from "./changeBoardPartSaga";
import { watchChangeBoardPropSaga } from "./changeBoardPropSaga";
import { watchChangeBoardPropValueSaga } from "./changeBoardPropValueSaga";
import { watchChangeBoardValuePartSaga } from "./changeBoardValuePartSaga";

export function* boardSaga() {
	yield spawn(watchChangeBoardPropSaga);
	yield spawn(watchChangeBoardValuePartSaga);
	yield spawn(watchChangeBoardPropValueSaga);
	yield spawn(watchChangeBoardPartSaga);
}
