import { fork } from "redux-saga/effects";
import { BaseSkidsOTooleAbilitySaga } from "./base/sagas/sagas";
import { ParallelSkidsOTooleAbilitySaga } from "./parallel/sagas";

export function* SkidsOTooleAbilitySaga() {
	yield fork(BaseSkidsOTooleAbilitySaga);
	yield fork(ParallelSkidsOTooleAbilitySaga);
}
