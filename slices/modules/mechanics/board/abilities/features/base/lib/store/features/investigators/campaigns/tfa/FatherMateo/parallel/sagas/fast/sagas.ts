import { fork } from "redux-saga/effects";
import { ParallelFatherMateoFastCheckFailSaga } from "./fastFailCheck/fastFailCheckSaga";
import { ParallelFatherMateoOpenModalSaga } from "./openModal/openModalSaga";
import { ParallelFatherMateoProcessModalActionSaga } from "./processModalAction/processModalActionSaga";
import { ParallelFatherMateoSealBlessOnBoardSaga } from "./sealBlessOnBoard/sealBlessOnBoardSaga";
import { ParallelFatherMateoTriggerFastAbilitySaga } from "./triggerFastAbility/triggerFastAbilitySaga";

export function* ParallelFatherMateoFastAbilitySaga() {
	yield fork(ParallelFatherMateoOpenModalSaga);
	yield fork(ParallelFatherMateoProcessModalActionSaga);
	yield fork(ParallelFatherMateoFastCheckFailSaga);
	yield fork(ParallelFatherMateoSealBlessOnBoardSaga);
	yield fork(ParallelFatherMateoTriggerFastAbilitySaga);
}
