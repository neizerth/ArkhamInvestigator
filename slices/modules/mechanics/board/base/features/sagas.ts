import { spawn } from "redux-saga/effects";
import { cluesFeaturesSaga } from "./clues/sagas";

export function* boardFeatureMechanicsSaga() {
	yield spawn(cluesFeaturesSaga);
}
