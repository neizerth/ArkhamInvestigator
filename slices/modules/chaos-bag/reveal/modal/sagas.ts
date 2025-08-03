import { spawn } from "redux-saga/effects";
import { chaosTokenRevealModalSaga } from "./features/chaos-token-reveal-modal/lib/store/sagas";

export function* chaosBagRevealModalSaga() {
	yield spawn(chaosTokenRevealModalSaga);
}
