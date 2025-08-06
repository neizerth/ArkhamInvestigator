import { fork } from "redux-saga/effects";
import { CalwinWrightAbilitySaga } from "./CalwinWrightAbilitySaga";

export function* TheForgottenAgeInvestigatorAbilitySaga() {
	yield fork(CalwinWrightAbilitySaga);
}
