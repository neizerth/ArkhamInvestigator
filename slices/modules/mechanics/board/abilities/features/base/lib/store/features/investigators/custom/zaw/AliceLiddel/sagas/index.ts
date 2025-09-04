import { fork } from "redux-saga/effects";
import { AliceLiddelAbilityTriggerSaga } from "./abilityTriggerSaga";
import { AliceLiddelProcessModalConfirmSaga } from "./processModalSaga";
import { AliceLiddelSetIntellectSaga } from "./setIntellectSaga";

export function* AliceLiddelSaga() {
	yield fork(AliceLiddelAbilityTriggerSaga);
	yield fork(AliceLiddelProcessModalConfirmSaga);
	yield fork(AliceLiddelSetIntellectSaga);
}
