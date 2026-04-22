import { fork } from "redux-saga/effects";
import { MarieLambeauReactionAbilityTriggerSaga as abilityTriggerSaga } from "./abilityTriggerSaga";
import { MarieLambeauReactionDamageSaga as damageSaga } from "./damageSaga";

export function* MarieLambeauReactionSaga() {
	yield fork(damageSaga);
	yield fork(abilityTriggerSaga);
}
