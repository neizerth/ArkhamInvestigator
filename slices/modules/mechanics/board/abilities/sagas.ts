import { fork } from "redux-saga/effects";
import { boardAbilitiesMechanicsFeatures } from "./features/sagas";

export function* boardAbilitiesMechanicsSaga() {
	yield fork(boardAbilitiesMechanicsFeatures);
}
