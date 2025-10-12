import { fork } from "redux-saga/effects";
import { StellaClarkElderSignSaga } from "./elderSign/sagas";
import { StellaClarkFailSaga } from "./fail/failSaga";
import { StellaClarkReactionSaga } from "./reaction/sagas";

export function* StellaClarkAbilitySaga() {
	yield fork(StellaClarkReactionSaga);
	yield fork(StellaClarkElderSignSaga);
	yield fork(StellaClarkFailSaga);
}
