import { fork } from "redux-saga/effects";
import { ParallelWendyAdamsAbilitySaga } from "./parallel/sagas";

export function* WendyAdamsAbilitySaga() {
	yield fork(ParallelWendyAdamsAbilitySaga);
}
