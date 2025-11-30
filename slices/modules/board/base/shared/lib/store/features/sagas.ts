import { spawn } from "redux-saga/effects";
import { boardIndexSaga } from "./boardIndex/sagas";
import { setBoardSaga } from "./setBoard/setBoardSaga";
import { setBoardPartSaga } from "./setBoardPart/setBoardPartSaga";
import { setBoardPropSaga } from "./setBoardProp/setBoardPropSaga";
import { setBoardPropValueSaga } from "./setBoardPropValue/setBoardPropValueSaga";
import { setBoardValuePartSaga } from "./setBoardValuePart/setBoardValuePartSaga";

export function* boardBaseSharedSaga() {
	yield spawn(setBoardSaga);
	yield spawn(setBoardPropSaga);
	yield spawn(setBoardValuePartSaga);
	yield spawn(setBoardPropValueSaga);
	yield spawn(setBoardPartSaga);
	yield spawn(boardIndexSaga);
}
