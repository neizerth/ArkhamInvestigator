import { fork } from "redux-saga/effects";
import { SisterMaryAbilitySaga } from "./SisterMary/sagas";

export function* TheInnsmouthConspiracyInvestigatorAbilitySaga() {
	yield fork(SisterMaryAbilitySaga);
}
