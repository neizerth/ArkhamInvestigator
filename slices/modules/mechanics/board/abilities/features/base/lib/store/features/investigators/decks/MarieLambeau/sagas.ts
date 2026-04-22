import { fork } from "redux-saga/effects";
import { MarieLambeauElderSignSaga } from "./elderSignSaga";
import { MarieLambeauReactionSaga } from "./reaction/sagas";

export function* MarieLambeauAbilitySaga() {
	yield fork(MarieLambeauReactionSaga);
	yield fork(MarieLambeauElderSignSaga);
}
