import { fork } from "redux-saga/effects";
import { BeastWithinAbilitySaga } from "./BeastWithinAbilitySaga";
import { HenryBigbyAbilitySaga } from "./HenryBigbyAbilitySaga";
import { swapCardSaga } from "./swapCard/swapCardSaga";

export const AbominationAbilitySaga = function* () {
	yield fork(HenryBigbyAbilitySaga);
	yield fork(BeastWithinAbilitySaga);
	yield fork(swapCardSaga);
};
