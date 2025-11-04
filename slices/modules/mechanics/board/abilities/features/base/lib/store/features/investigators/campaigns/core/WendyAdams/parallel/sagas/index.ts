import { fork } from "redux-saga/effects";
import { ParallelWendyAdamsProcessModalActionSaga } from "./processModalAction/processModalActionSaga";
import { ParallelWendyAdamsReactionAbilitySaga } from "./reaction/reactionSaga";

export function* ParallelWendyAdamsAbilitySaga() {
	yield fork(ParallelWendyAdamsReactionAbilitySaga);
	yield fork(ParallelWendyAdamsProcessModalActionSaga);
}
