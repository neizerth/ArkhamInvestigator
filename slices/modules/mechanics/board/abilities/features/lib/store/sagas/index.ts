import { spawn } from "redux-saga/effects";
import { investigatorAbilitySaga } from "./investigators";

export function* boardEntityAbilityMechanicsSaga() {
	yield spawn(investigatorAbilitySaga);
}
