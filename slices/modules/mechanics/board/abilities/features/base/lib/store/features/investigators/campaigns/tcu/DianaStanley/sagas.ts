import { fork } from "redux-saga/effects";
import { DianaStanleyAbilityCounterSaga } from "./counterSaga";
import { DianaStanleyAbilityReactionSaga } from "./reactionSaga";

export function* DianaStanleyAbilitySaga() {
	yield fork(DianaStanleyAbilityCounterSaga);
	yield fork(DianaStanleyAbilityReactionSaga);
}
