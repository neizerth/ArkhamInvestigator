import { fork } from "redux-saga/effects";
import { SisterMaryAbilitySaga } from "./SisterMaryAbilitySaga";

export function* TheInnsmouthConspiracyInvestigatorAbilitySaga() {
	yield fork(SisterMaryAbilitySaga);
}
