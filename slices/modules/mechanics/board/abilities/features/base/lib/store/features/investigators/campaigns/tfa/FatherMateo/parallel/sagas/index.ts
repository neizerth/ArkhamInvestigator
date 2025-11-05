import { fork } from "redux-saga/effects";
import { ParallelFatherMateoFastAbilitySaga } from "./fast/sagas";

export function* ParallelFatherMateoSaga() {
	yield fork(ParallelFatherMateoFastAbilitySaga);
}
