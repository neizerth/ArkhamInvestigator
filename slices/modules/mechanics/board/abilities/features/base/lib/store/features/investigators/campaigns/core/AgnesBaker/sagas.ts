import { spawn } from "redux-saga/effects";
import { ParallelAgnesBakerAbilitySaga } from "./parallel/sagas";

export function* AgnesBakerAbilitySaga() {
	yield spawn(ParallelAgnesBakerAbilitySaga);
}
