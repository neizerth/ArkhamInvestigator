import { spawn } from "redux-saga/effects";
import { addMultipleChaosTokensSaga } from "../features/add/addMultipleChaosTokens/addMultipleChaosTokensSaga";
import { addSingleChaosTokenSaga } from "../features/add/addSingleChaosToken/addSingleChaosTokenSaga";
import { createChaosBagSaga } from "../features/bag/createChaosBag/createChaosBagSaga";
import { setCustomChaosBagSkillValueSaga } from "../features/bag/setCustomChaosBagSkillValue/setCustomChaosBagSkillValueSaga";
import { updateChaosBagSaga } from "../features/bag/updateChaosBag/updateChaosBagSaga";
import { removeSingleChaosTokenSaga } from "../features/remove/removeSingleChaosTokenSaga";
import { sealChaosTokenSaga } from "../features/seal/sealChaosToken/sealChaosTokenSaga";
import { toggleChaosTokenSealSaga } from "../features/seal/toggleChaosTokenSeal/toggleChaosTokenSealSaga";
import { unsealChaosTokenSaga } from "../features/seal/unsealChaosToken/unsealChaosTokenSaga";
import { updateChaosTokenSaga } from "../features/update/updateChaosTokenSaga";

export function* chaosBagEntitiesSaga() {
	yield spawn(addMultipleChaosTokensSaga);
	yield spawn(addSingleChaosTokenSaga);

	yield spawn(createChaosBagSaga);
	yield spawn(setCustomChaosBagSkillValueSaga);
	yield spawn(updateChaosBagSaga);

	yield spawn(removeSingleChaosTokenSaga);

	yield spawn(sealChaosTokenSaga);
	yield spawn(unsealChaosTokenSaga);
	yield spawn(toggleChaosTokenSealSaga);

	yield spawn(updateChaosTokenSaga);
}
