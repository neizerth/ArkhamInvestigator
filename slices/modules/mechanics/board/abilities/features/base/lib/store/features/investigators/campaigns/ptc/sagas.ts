import { fork } from "redux-saga/effects";
import { LolaHayesAbilitySaga } from "./LolaHayesAbilitySaga";
import { MinhThiPhanAbilitySaga } from "./MinhThiPhan/sagas";

export function* ThePathToCarcosaInvestigatorAbilitySaga() {
	yield fork(MinhThiPhanAbilitySaga);
	yield fork(LolaHayesAbilitySaga);
}
