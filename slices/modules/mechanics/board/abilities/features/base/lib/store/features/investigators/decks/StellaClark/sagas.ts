import { fork } from "redux-saga/effects";
import { StellaClarkElderSignSaga } from "./elderSign/sagas";
import { StellaClarkReactionSaga } from "./reactionSaga";

export function* StellaClarkAbilitySaga() {
	yield fork(StellaClarkReactionSaga);
	yield fork(StellaClarkElderSignSaga);
}
