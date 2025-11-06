import { fork } from "redux-saga/effects";
import { LuciaDeverauxElderSignSaga } from "./elderSign";
import { LuciaDeverauxReactionSaga } from "./reaction/reactionSaga";

export function* LuciaDeverauxAbilitySaga() {
	yield fork(LuciaDeverauxReactionSaga);
	yield fork(LuciaDeverauxElderSignSaga);
}
