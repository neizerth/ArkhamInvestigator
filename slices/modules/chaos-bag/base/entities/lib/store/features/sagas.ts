import { spawn } from "redux-saga/effects";
import { addChaosTokenSaga } from "./add/sagas";
import { chaosBagCommonSaga } from "./bag/sagas";
import { removeChaosTokenSaga } from "./remove/sagas";
import { sealChaosTokenSaga } from "./seal/sagas";
import { updateChaosTokenSaga } from "./update/updateChaosTokenSaga";

export function* chaosBagEntitiesSaga() {
	yield spawn(chaosBagCommonSaga);

	yield spawn(addChaosTokenSaga);
	yield spawn(removeChaosTokenSaga);
	yield spawn(sealChaosTokenSaga);

	yield spawn(updateChaosTokenSaga);
}
