import { spawn } from "redux-saga/effects";
import { chaosBagBaseSaga } from "./base/sagas";
import { chaosBagRevealSaga } from "./reveal/sagas";
import { chaosBagValueSaga } from "./value/sagas";

export function* chaosBagSaga() {
	yield spawn(chaosBagBaseSaga);
	yield spawn(chaosBagValueSaga);
	yield spawn(chaosBagRevealSaga);
}
