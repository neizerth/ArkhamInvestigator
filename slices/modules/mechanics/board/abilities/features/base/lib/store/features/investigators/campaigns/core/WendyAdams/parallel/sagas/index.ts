import { fork } from "redux-saga/effects";
import { ParallelWendyAdamsElderSignSaga } from "./elderSign/sagas";
import { ParallelWendyAdamsProcessModalActionSaga } from "./processModalAction/processModalActionSaga";
import { ParallelWendyAdamsReactionAbilitySaga } from "./reaction/reactionSaga";
import { ParallelWendyAdamsReactionCheckFailSaga } from "./reactionCheckFailSaga/reactionCheckFailSaga";

export function* ParallelWendyAdamsAbilitySaga() {
	yield fork(ParallelWendyAdamsReactionAbilitySaga);
	yield fork(ParallelWendyAdamsProcessModalActionSaga);
	yield fork(ParallelWendyAdamsReactionCheckFailSaga);
	yield fork(ParallelWendyAdamsElderSignSaga);
}
