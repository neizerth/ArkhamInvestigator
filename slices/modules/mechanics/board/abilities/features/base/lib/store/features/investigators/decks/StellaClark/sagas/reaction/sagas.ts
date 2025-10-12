import { fork } from "redux-saga/effects";
import { StellaClarkAbilityTriggerSaga } from "./abilityTriggerSaga";
import { StellaClarkChaosBagFailSaga } from "./chaosBagFailSaga";

export function* StellaClarkReactionSaga() {
	yield fork(StellaClarkChaosBagFailSaga);
	yield fork(StellaClarkAbilityTriggerSaga);
}
