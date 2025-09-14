import { fork } from "redux-saga/effects";
import { CarsonSinclairAbilitySaga } from "./CarsonSinclair/sagas";
import { VincentLeeAbilitySaga } from "./VincentLee";

export function* TheScarletKeysInvestigatorAbilitySaga() {
	yield fork(CarsonSinclairAbilitySaga);
	yield fork(VincentLeeAbilitySaga);
}
