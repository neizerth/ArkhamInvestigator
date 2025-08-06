import { fork } from "redux-saga/effects";
import { LilyChenAbilitySaga } from "./LilyChenAbilitySaga";

export function* EdgeOfTheEarthInvestigatorAbilitySaga() {
	yield fork(LilyChenAbilitySaga);
}
