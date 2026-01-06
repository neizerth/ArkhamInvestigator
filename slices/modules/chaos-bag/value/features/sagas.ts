import { spawn } from "redux-saga/effects";
import { resetChaosTokenValueSaga } from "./reset-chaos-token-value/resetChaosTokenValueSaga";
import { updateValueAfterOptionChangeSaga } from "./update-value-after-option-change/updateValueAfterOptionChangeSaga";

export function* chaosBagValueFeaturesSaga() {
	yield spawn(updateValueAfterOptionChangeSaga);
	yield spawn(resetChaosTokenValueSaga);
}
