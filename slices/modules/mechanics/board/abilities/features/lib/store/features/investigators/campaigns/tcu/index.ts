import { fork } from "redux-saga/effects";
import { DianaStanleyAbilitySaga } from "./DianaStanleyAbilitySaga";

export function* TheCircleUndoneInvestigatorAbilitySaga() {
	yield fork(DianaStanleyAbilitySaga);
}
