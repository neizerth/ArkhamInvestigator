import { spawn } from "redux-saga/effects";
import { resetTestAbilitiesSaga } from "./reset-test-abilities/resetTestAbilitiesSaga";

export function* boardAbilityFeaturesSaga() {
	yield spawn(resetTestAbilitiesSaga);
}
