import { fork } from "redux-saga/effects";
import { ValentinoRivasElderSignSaga } from "./elderSignSaga";
import { ValentinoRivasFastCheckFailSaga } from "./fastCheckFailSaga";
import { ValentinoRivasFastAbilitySaga } from "./fastSaga";

export function* ValentinoRivasAbilitySaga() {
	yield fork(ValentinoRivasFastAbilitySaga);
	yield fork(ValentinoRivasFastCheckFailSaga);
	yield fork(ValentinoRivasElderSignSaga);
}
