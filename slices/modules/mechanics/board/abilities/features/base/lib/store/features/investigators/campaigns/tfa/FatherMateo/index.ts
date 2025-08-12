import { spawn } from "redux-saga/effects";
import { BaseFatherMateoAbilitySaga } from "./base/features/sagas";

export function* FatherMateoAbilitySaga() {
	yield spawn(BaseFatherMateoAbilitySaga);
}
