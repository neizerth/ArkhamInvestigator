import { fork } from "redux-saga/effects";
import { CarolynFernAbilitySaga } from "./CarolynFern";
import { DianaStanleyAbilitySaga } from "./DianaStanleyAbilitySaga";
import { PrestonFairmontAbilitySaga } from "./PrestonFairmont";

export function* TheCircleUndoneInvestigatorAbilitySaga() {
	yield fork(DianaStanleyAbilitySaga);
	yield fork(CarolynFernAbilitySaga);
	yield fork(PrestonFairmontAbilitySaga);
}
