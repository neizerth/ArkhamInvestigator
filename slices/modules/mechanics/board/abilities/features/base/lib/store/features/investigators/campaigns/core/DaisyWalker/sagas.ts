import { fork } from "redux-saga/effects";
import { ParallelDaisyWalkerAbilitySaga } from "./ParallelDaisyWalkerAbilitySaga";

export function* DaisyWalkerAbilitySaga() {
	yield fork(ParallelDaisyWalkerAbilitySaga);
}
