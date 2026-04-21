import { fork } from "redux-saga/effects";
import { AndrePatelAbilitySaga } from "./AndrePatel/sagas";
import { StellaClarkAbilitySaga } from "./StellaClark/sagas";

export function* investigatorDecksAbilitySaga() {
	yield fork(StellaClarkAbilitySaga);
	yield fork(AndrePatelAbilitySaga);
}
