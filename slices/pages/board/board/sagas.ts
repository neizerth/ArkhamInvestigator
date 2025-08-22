import { fork } from "redux-saga/effects";
import { boardPageUISaga } from "./ui/sagas";

export function* boardPageSaga() {
	yield fork(boardPageUISaga);
}
