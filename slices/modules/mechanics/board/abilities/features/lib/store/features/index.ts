import { spawn } from "redux-saga/effects";
import { investigatorAbilitiesSaga } from "./investigators";

export function* boardEntityAbilityMechanicsSaga() {
	yield spawn(investigatorAbilitiesSaga);
}
