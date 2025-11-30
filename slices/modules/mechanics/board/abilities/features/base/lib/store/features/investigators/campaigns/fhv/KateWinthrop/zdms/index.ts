import { fork } from "redux-saga/effects";
import { chargeFluxStabilizerSaga } from "./sagas/chargeFluxStabilizer/chargeFluxStabilizerSaga";
import { DarkMatterKateWinthropElderSignSaga } from "./sagas/elderSign/elderSignSaga";
import { DarkMatterKateWinthropFluxStabilizerSaga } from "./sagas/fluxStabilizerSkillTest/fluxStabilizerSkillTestSaga";

export function* DarkMatterKateWinthropAbilitySaga() {
	yield fork(DarkMatterKateWinthropElderSignSaga);
	yield fork(DarkMatterKateWinthropFluxStabilizerSaga);
	yield fork(chargeFluxStabilizerSaga);
}
