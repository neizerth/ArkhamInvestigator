import { fork, spawn } from "redux-saga/effects";
import { CarsonSinclairAbilityTriggerSaga } from "./abilityTriggerSaga";
import { giveActionSaga } from "./giveAction/giveActionSaga";
import { CarsonSinclairProcessModalConfirmSaga } from "./processModalConfirmSaga";

export function* CarsonSinclairAbilitySaga() {
	yield fork(CarsonSinclairAbilityTriggerSaga);
	yield fork(CarsonSinclairProcessModalConfirmSaga);

	yield spawn(giveActionSaga);
}
