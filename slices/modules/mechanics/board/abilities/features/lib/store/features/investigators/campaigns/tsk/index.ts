import { fork } from "redux-saga/effects";
import { CarsonSinclairAbilitySaga } from "./CarsonSinclair";

export function* TheScarletKeysInvestigatorAbilitySaga() {
	yield fork(CarsonSinclairAbilitySaga);
}
