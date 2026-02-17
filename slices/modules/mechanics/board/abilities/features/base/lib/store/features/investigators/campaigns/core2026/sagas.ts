import { fork } from "redux-saga/effects";
import { Core2026IsabelleBarnesSaga } from "./IsabelleBarnes/sagas";
import { Core2026JoeDiamondSaga } from "./JoeDiamond/sagas";

export function* Core2026AbilitySaga() {
	yield fork(Core2026JoeDiamondSaga);
	yield fork(Core2026IsabelleBarnesSaga);
}
