import { fork } from "redux-saga/effects";
import { KohakuNarukamiAbilityTriggerSaga } from "./abilityTriggerSaga";
import { handleModalActionsSaga } from "./actionHandlers/sagas";

export function* KohakuNarukamiAbilitySaga() {
	yield fork(KohakuNarukamiAbilityTriggerSaga);
	yield fork(handleModalActionsSaga);
}
