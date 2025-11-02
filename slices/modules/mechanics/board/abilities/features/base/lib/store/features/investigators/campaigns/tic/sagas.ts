import { fork } from "redux-saga/effects";
import { SisterMaryAbilitySaga } from "./SisterMary/sagas";
import { TrishScarboroughAbilitySaga } from "./TrishScarboroughAbilitySaga";

export function* TheInnsmouthConspiracyInvestigatorAbilitySaga() {
	yield fork(SisterMaryAbilitySaga);
	yield fork(TrishScarboroughAbilitySaga);
}
