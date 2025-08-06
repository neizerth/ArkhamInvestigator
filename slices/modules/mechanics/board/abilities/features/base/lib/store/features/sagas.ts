import { spawn } from "redux-saga/effects";
import { investigatorAbilitiesSaga } from "./investigators/sagas";

export function* boardFeatureAbilityMechanicsSaga() {
	yield spawn(investigatorAbilitiesSaga);
}
