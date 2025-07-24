import { fork } from "redux-saga/effects";
import { ZoeySamarasAbilitySaga } from "./ZoeySamaras";

export function* TheDunwichLegacyInvestigatorAbilitySaga() {
	yield fork(ZoeySamarasAbilitySaga);
}
