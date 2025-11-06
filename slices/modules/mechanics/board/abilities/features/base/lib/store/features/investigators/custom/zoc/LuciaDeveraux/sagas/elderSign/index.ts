import { fork } from "redux-saga/effects";
import { LuciaDeverauxElderSignProcessModalActionSaga } from "./processModalAction/processModalActionSaga";
import { LuciaDeverauxElderSignRevealSaga } from "./revealSaga/revealSaga";

export function* LuciaDeverauxElderSignSaga() {
	yield fork(LuciaDeverauxElderSignRevealSaga);
	yield fork(LuciaDeverauxElderSignProcessModalActionSaga);
}
