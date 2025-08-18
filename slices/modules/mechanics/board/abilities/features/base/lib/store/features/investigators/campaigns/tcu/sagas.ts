import { fork } from "redux-saga/effects";
import { CarolynFernAbilitySaga } from "./CarolynFern";
import { DianaStanleyAbilitySaga } from "./DianaStanleyAbilitySaga";

export function* TheCircleUndoneInvestigatorAbilitySaga() {
	yield fork(DianaStanleyAbilitySaga);
	yield fork(CarolynFernAbilitySaga);
}
