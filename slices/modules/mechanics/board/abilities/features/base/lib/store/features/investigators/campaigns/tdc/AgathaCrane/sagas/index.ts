import { fork } from "redux-saga/effects";
import { AgathaCraneEndTurnAbilitySaga } from "./endTurnSaga";
import { AgathaCraneReactionSaga } from "./reactionSaga";

export function* AgathaCraneAbilitySaga() {
	yield fork(AgathaCraneReactionSaga);
	yield fork(AgathaCraneEndTurnAbilitySaga);
}
