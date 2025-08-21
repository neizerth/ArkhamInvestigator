import { fork } from "redux-saga/effects";
import { StellaClarkAbilitySaga } from "./StellaClark/sagas";

export function* InvestigatorDecksAbilitySaga() {
	yield fork(StellaClarkAbilitySaga);
}
