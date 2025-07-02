import { spawn } from "redux-saga/effects";
import { addChaosTokenSaga } from "./add";
import { createChaosBagSaga } from "./createChaosBagSaga";
import { removeChaosTokenSaga } from "./remove";
import { sealChaosTokenSaga } from "./seal";
import { updateChaosTokenSaga } from "./update";

export function* chaosBagEntitiesSaga() {
	yield spawn(addChaosTokenSaga);
	yield spawn(removeChaosTokenSaga);
	yield spawn(updateChaosTokenSaga);
	yield spawn(sealChaosTokenSaga);

	yield spawn(createChaosBagSaga);
}
