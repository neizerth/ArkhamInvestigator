import { fork } from "redux-saga/effects";
import { CarsonSinclairAbilityTriggerSaga } from "./abilityTriggerSaga";
import { CarsonSinclairProcessModalConfirmSaga } from "./processModalConfirmSaga";

export function* CarsonSinclairAbilitySaga() {
	yield fork(CarsonSinclairAbilityTriggerSaga);
	yield fork(CarsonSinclairProcessModalConfirmSaga);
}
