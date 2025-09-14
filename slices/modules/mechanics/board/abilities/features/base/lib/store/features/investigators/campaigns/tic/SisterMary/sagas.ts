import { fork } from "redux-saga/effects";
import { SisterMaryElderSignSaga } from "./elderSignSaga";
import { SisterMaryReactionSaga } from "./reactionSaga";

export function* SisterMaryAbilitySaga() {
	yield fork(SisterMaryReactionSaga);
	yield fork(SisterMaryElderSignSaga);
}
