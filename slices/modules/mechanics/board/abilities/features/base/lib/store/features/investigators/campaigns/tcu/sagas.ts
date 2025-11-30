import { fork } from "redux-saga/effects";
import { CarolynFernAbilitySaga } from "./CarolynFern";
import { DianaStanleyAbilitySaga } from "./DianaStanley/sagas";
import { GavriellaMizrahAbilitySaga } from "./GavriellaMizrah/sagas";
import { JeromeDavidsAbilitySaga } from "./JeromeDavids/sagas";
import { PennyWhiteAbilitySaga } from "./PennyWhiteAbilitySaga";
import { PrestonFairmontAbilitySaga } from "./PrestonFairmont";
import { ValentinoRivasAbilitySaga } from "./ValentinoRivas/sagas";

export function* TheCircleUndoneInvestigatorAbilitySaga() {
	yield fork(DianaStanleyAbilitySaga);
	yield fork(CarolynFernAbilitySaga);
	yield fork(PrestonFairmontAbilitySaga);

	yield fork(GavriellaMizrahAbilitySaga);
	yield fork(PennyWhiteAbilitySaga);
	yield fork(ValentinoRivasAbilitySaga);
	yield fork(JeromeDavidsAbilitySaga);
}
