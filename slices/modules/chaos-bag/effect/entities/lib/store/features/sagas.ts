import { spawn } from "redux-saga/effects";
import { updateChaosTokenOptionSaga } from "./updateChaosTokenOption/updateChaosTokenOptionSaga";

export function* chaosBagEffectEntitiesSaga() {
	yield spawn(updateChaosTokenOptionSaga);
}
