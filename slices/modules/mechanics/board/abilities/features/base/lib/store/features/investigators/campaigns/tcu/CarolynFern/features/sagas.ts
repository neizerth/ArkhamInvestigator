import { fork } from "redux-saga/effects";
import { CarolynFernElderSignAbilitySaga } from "./elderSign/sagas";
import { CarolynFernReactionAbilitySaga } from "./reaction/sagas";

export function* CarolynFernAbilitySaga() {
	yield fork(CarolynFernElderSignAbilitySaga);
	yield fork(CarolynFernReactionAbilitySaga);
}
