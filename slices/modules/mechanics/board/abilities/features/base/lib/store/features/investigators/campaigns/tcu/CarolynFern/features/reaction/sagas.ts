import { fork } from "redux-saga/effects";
import { CarolynFernGiveResourceSaga } from "./giveResource/giveResourceSaga";
import { CarolynFernHandleReactionSaga } from "./handleReaction/handleReactionSaga";

export function* CarolynFernReactionAbilitySaga() {
	yield fork(CarolynFernHandleReactionSaga);
	yield fork(CarolynFernGiveResourceSaga);
}
