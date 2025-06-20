import { spawn } from "redux-saga/effects";
import { changeBoardPartSaga } from "./changeBoardPartSaga";
import { changeBoardPropSaga } from "./changeBoardPropSaga";
import { changeBoardPropValueSaga } from "./changeBoardPropValueSaga";
import { changeBoardValuePartSaga } from "./changeBoardValuePartSaga";

export function* boardSharedSaga() {
	yield spawn(changeBoardPropSaga);
	yield spawn(changeBoardValuePartSaga);
	yield spawn(changeBoardPropValueSaga);
	yield spawn(changeBoardPartSaga);
}
