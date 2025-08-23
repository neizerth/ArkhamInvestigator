import { fork } from "redux-saga/effects";
import { LilyChenAbilitySaga } from "./LilyChen/sagas";

export function* EdgeOfTheEarthInvestigatorAbilitySaga() {
	yield fork(LilyChenAbilitySaga);
}
