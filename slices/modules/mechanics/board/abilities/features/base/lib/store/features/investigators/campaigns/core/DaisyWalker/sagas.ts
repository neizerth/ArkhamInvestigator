import { fork } from "redux-saga/effects";
import { ParallelDaisyWalkerAbilitySaga } from "./parallelSaga";

export function* DaisyWalkerAbilitySaga() {
	yield fork(ParallelDaisyWalkerAbilitySaga);
}
