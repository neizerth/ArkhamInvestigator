import { fork } from "redux-saga/effects";
import { RexMurphyAbilitySaga } from "./RexMurphy/sagas";
import { ZoeySamarasAbilitySaga } from "./ZoeySamaras/sagas";

export function* TheDunwichLegacyInvestigatorAbilitySaga() {
	yield fork(ZoeySamarasAbilitySaga);
	yield fork(RexMurphyAbilitySaga);
}
