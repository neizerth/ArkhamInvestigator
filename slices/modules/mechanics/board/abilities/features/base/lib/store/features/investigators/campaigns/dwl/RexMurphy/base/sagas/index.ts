import { fork } from "redux-saga/effects";
import { BaseRexMurphyElderSignSaga } from "./elderSign/sagas";
import { BaseRexMurphyReactionSaga } from "./reaction/reactionSaga";

export function* BaseRexMurphyAbilitySaga() {
	yield fork(BaseRexMurphyElderSignSaga);
	yield fork(BaseRexMurphyReactionSaga);
}
