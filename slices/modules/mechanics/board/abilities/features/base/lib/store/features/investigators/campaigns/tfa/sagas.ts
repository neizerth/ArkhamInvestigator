import { fork } from "redux-saga/effects";
import { CalwinWrightAbilitySaga } from "./CalwinWrightAbilitySaga";
import { FatherMateoAbilitySaga } from "./FatherMateo/sagas";

export function* TheForgottenAgeInvestigatorAbilitySaga() {
	yield fork(CalwinWrightAbilitySaga);
	yield fork(FatherMateoAbilitySaga);
}
