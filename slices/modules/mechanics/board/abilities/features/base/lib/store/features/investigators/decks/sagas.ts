import { fork } from "redux-saga/effects";
import { AndrePatelAbilitySaga } from "./AndrePatel/sagas";
import { CarolynFernAbilitySaga } from "./CarolynFern/sagas";
import { MarieLambeauAbilitySaga } from "./MarieLambeau/sagas";
import { StellaClarkAbilitySaga } from "./StellaClark/sagas";

export function* investigatorDecksAbilitySaga() {
	yield fork(StellaClarkAbilitySaga);
	yield fork(AndrePatelAbilitySaga);
	yield fork(CarolynFernAbilitySaga);
	yield fork(MarieLambeauAbilitySaga);
}
