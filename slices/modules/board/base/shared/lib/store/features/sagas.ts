import { spawn } from "redux-saga/effects";
import { setBoardSaga } from "./setBoard/setBoardSaga";
import { setBoardPartSaga } from "./setBoardPart/setBoardPartSaga";
import { setBoardPropSaga } from "./setBoardProp/setBoardPropSaga";
import { setBoardPropValueSaga } from "./setBoardPropValue/setBoardPropValueSaga";
import { setBoardValuePartSaga } from "./setBoardValuePart/setBoardValuePartSaga";

export function* boardSharedSaga() {
	yield spawn(setBoardSaga);
	yield spawn(setBoardPropSaga);
	yield spawn(setBoardValuePartSaga);
	yield spawn(setBoardPropValueSaga);
	yield spawn(setBoardPartSaga);
}
