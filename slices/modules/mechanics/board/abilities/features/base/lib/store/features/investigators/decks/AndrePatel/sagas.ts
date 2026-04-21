import { fork } from "redux-saga/effects";
import { AndrePatelElderSignSaga } from "./elderSignSaga";
import { AndrePatelSucceedSaga } from "./succeedSaga";

export function* AndrePatelAbilitySaga() {
	yield fork(AndrePatelSucceedSaga);
	yield fork(AndrePatelElderSignSaga);
}
