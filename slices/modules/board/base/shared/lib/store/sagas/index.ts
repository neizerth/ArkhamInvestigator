import { spawn } from "redux-saga/effects";
import { setBoardPartSaga } from "./setBoardPartSaga";
import { setBoardPropSaga } from "./setBoardPropSaga";
import { setBoardPropValueSaga } from "./setBoardPropValueSaga";
import { setBoardSaga } from "./setBoardSaga";
import { setBoardValuePartSaga } from "./setBoardValuePartSaga";

export function* boardSharedSaga() {
	yield spawn(setBoardSaga);
	yield spawn(setBoardPropSaga);
	yield spawn(setBoardValuePartSaga);
	yield spawn(setBoardPropValueSaga);
	yield spawn(setBoardPartSaga);
}
