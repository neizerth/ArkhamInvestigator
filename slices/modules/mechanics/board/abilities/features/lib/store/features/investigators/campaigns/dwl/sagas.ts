import { fork } from "redux-saga/effects";
import { ZoeySamarasAbilitySaga } from "./ZoeySamaras/sagas";

export function* TheDunwichLegacyInvestigatorAbilitySaga() {
	yield fork(ZoeySamarasAbilitySaga);
}
