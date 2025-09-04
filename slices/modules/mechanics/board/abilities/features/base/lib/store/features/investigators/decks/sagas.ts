import { fork } from "redux-saga/effects";
import { StellaClarkAbilitySaga } from "./StellaClark/sagas";

export function* investigatorDecksAbilitySaga() {
	yield fork(StellaClarkAbilitySaga);
}
