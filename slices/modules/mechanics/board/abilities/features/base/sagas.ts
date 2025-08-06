import { spawn } from "redux-saga/effects";
import { boardFeatureAbilityMechanicsSaga } from "./lib/store/sagas";

export function* boardAbilityBaseFeatureMechanicsSaga() {
	yield spawn(boardFeatureAbilityMechanicsSaga);
}
