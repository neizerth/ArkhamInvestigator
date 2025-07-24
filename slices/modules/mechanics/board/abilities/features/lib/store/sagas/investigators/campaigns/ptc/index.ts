import { fork } from "redux-saga/effects";
import { LolaHayesAbilitySaga } from "./LolaHayesAbilitySaga";
import { MinhThiPhanAbilitySaga } from "./MinhThiPhan";

export function* ThePathToCarcosaInvestigatorAbilitySaga() {
	yield fork(MinhThiPhanAbilitySaga);
	yield fork(LolaHayesAbilitySaga);
}
