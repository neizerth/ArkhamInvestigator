import { fork } from "redux-saga/effects";
import { ParallelWendyAdamsProcessModalActionSaga } from "./processModalAction/processModalActionSaga";
import { ParallelWendyAdamsReactionAbilitySaga } from "./reaction/reactionSaga";
import { ParallelWendyAdamsReactionCheckFailSaga } from "./reactionCheckFailSaga/reactionCheckFailSaga";

export function* ParallelWendyAdamsAbilitySaga() {
	yield fork(ParallelWendyAdamsReactionAbilitySaga);
	yield fork(ParallelWendyAdamsProcessModalActionSaga);
	yield fork(ParallelWendyAdamsReactionCheckFailSaga);
}
