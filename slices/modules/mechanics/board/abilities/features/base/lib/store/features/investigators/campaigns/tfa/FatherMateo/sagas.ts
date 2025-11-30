import { spawn } from "redux-saga/effects";
import { BaseFatherMateoAbilitySaga } from "./base/features/sagas";
import { ParallelFatherMateoSaga } from "./parallel/sagas";

export function* FatherMateoAbilitySaga() {
	yield spawn(BaseFatherMateoAbilitySaga);
	yield spawn(ParallelFatherMateoSaga);
}
