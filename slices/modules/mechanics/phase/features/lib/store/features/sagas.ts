import { spawn } from "redux-saga/effects";
import { commonPhaseSaga } from "./common/sagas";
import { phaseEffectsSaga } from "./effects/sagas";

export function* phaseSaga() {
	yield spawn(commonPhaseSaga);
	yield spawn(phaseEffectsSaga);
}
