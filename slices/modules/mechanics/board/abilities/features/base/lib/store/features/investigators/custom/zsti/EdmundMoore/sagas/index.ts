import { fork } from "redux-saga/effects";
import { EdmundMooreFastCheckFailSaga } from "./fastCheckFailSaga";
import { EdmundMooreFastAbilitySaga } from "./fastSaga";

export function* EdmundMooreAbilitySaga() {
	yield fork(EdmundMooreFastAbilitySaga);
	yield fork(EdmundMooreFastCheckFailSaga);
}
