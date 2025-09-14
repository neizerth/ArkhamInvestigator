import { fork } from "redux-saga/effects";
import { KohakuNarukamiAbilityTriggerSaga } from "./abilityTriggerSaga";
import { handleModalActionsSaga } from "./actionHandlers/sagas";
import { KohakuNarukamiElderSignSaga } from "./elderSignSaga";

export function* KohakuNarukamiAbilitySaga() {
	yield fork(KohakuNarukamiAbilityTriggerSaga);
	yield fork(KohakuNarukamiElderSignSaga);
	yield fork(handleModalActionsSaga);
}
