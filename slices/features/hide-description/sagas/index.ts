import { spawn } from "redux-saga/effects";
import { resetBoardSaga } from "./resetBoardSaga";

export function* hideDescriptionSaga() {
	yield spawn(resetBoardSaga);
}
