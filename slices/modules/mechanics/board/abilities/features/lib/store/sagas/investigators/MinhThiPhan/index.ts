import { fork } from "redux-saga/effects";
import { MinhThiPhanAbilityTriggerSaga } from "./abilityTriggerSaga";
import { addWildSaga } from "./addWild/addWildSaga";
import { MinhThiPhanProcessModalConfirmSaga } from "./processModalSaga";

export function* MinhThiPhanAbilitySaga() {
	yield fork(MinhThiPhanProcessModalConfirmSaga);
	yield fork(MinhThiPhanAbilityTriggerSaga);
	yield fork(addWildSaga);
}
