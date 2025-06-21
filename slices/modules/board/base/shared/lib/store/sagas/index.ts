import { spawn } from "redux-saga/effects";
import { setBoardPartSaga } from "./setBoardPartSaga";
import { setBoardPropSaga } from "./setBoardPropSaga";
import { setBoardPropValueSaga } from "./setBoardPropValueSaga";
import { setBoardValuePartSaga } from "./setBoardValuePartSaga";

export function* boardSharedSaga() {
	yield spawn(setBoardPropSaga);
	yield spawn(setBoardValuePartSaga);
	yield spawn(setBoardPropValueSaga);
	yield spawn(setBoardPartSaga);
}
