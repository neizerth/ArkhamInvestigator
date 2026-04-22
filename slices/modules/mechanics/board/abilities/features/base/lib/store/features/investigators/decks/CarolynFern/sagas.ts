import { fork } from "redux-saga/effects";
import { CarolynFernReactionSaga } from "./reactionSaga";

//** Elder Sign saga is shared with the campaign signature */
export function* CarolynFernAbilitySaga() {
	yield fork(CarolynFernReactionSaga);
}
