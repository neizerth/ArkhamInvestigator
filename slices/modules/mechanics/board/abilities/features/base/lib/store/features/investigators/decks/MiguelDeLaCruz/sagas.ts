import { fork } from "redux-saga/effects";
import { MiguelDeLaCruzElderSignSaga } from "./elderSignSaga";

export function* MiguelDeLaCruzAbilitySaga() {
	yield fork(MiguelDeLaCruzElderSignSaga);
}
