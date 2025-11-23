import { spawn } from "redux-saga/effects";
import { updateValueAfterOptionChangeSaga } from "./update-value-after-option-change/updateValueAfterOptionChangeSaga";

export function* chaosBagValueFeaturesSaga() {
	yield spawn(updateValueAfterOptionChangeSaga);
}
