import { fork } from "redux-saga/effects";
import { ParallelSkidsOTooleAbilityTriggerSaga } from "./abilityTrigger/abilityTriggerSaga";
import { ParallelSkidsOTooleEndRevealSaga } from "./endRevealSaga/endRevealSaga";
import { ParallelSkidsOTooleProcessModalActionSaga } from "./processModalAction/processModalActionSaga";
import { ParallelSkidsOTooleStartResourcesTestSaga } from "./startResourcesTest/startResourcesTestSaga";

export function* ParallelSkidsOTooleAbilitySaga() {
	yield fork(ParallelSkidsOTooleAbilityTriggerSaga);
	yield fork(ParallelSkidsOTooleStartResourcesTestSaga);
	yield fork(ParallelSkidsOTooleProcessModalActionSaga);
	yield fork(ParallelSkidsOTooleEndRevealSaga);
}
