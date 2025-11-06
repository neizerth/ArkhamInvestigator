import { fork } from "redux-saga/effects";
import { GavriellaMizrahElderSignSaga } from "./elderSignSaga";
import { GavriellaMizrahReactionSaga } from "./reactionSaga";

export function* GavriellaMizrahAbilitySaga() {
	yield fork(GavriellaMizrahReactionSaga);
	yield fork(GavriellaMizrahElderSignSaga);
}
