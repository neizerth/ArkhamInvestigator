import { fork } from "redux-saga/effects";
import { CalwinWrightAbilitySaga } from "./CalwinWrightAbilitySaga";
import { FatherMateoAbilitySaga } from "./FatherMateo";

export function* TheForgottenAgeInvestigatorAbilitySaga() {
	yield fork(CalwinWrightAbilitySaga);
	yield fork(FatherMateoAbilitySaga);
}
