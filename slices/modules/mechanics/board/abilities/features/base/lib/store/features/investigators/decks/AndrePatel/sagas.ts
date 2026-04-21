import { fork } from "redux-saga/effects";
import { AndrePatelSucceedSaga } from "./succeedSaga";

export function* AndrePatelAbilitySaga() {
	yield fork(AndrePatelSucceedSaga);
}
