import { spawn } from "redux-saga/effects";
import { createChaosBagSaga } from "./createChaosBag/createChaosBagSaga";
import { setCustomChaosBagSkillValueSaga } from "./setCustomChaosBagSkillValue/setCustomChaosBagSkillValueSaga";
import { updateChaosBagSaga } from "./updateChaosBag/updateChaosBagSaga";

export function* chaosBagCommonSaga() {
	yield spawn(createChaosBagSaga);
	yield spawn(setCustomChaosBagSkillValueSaga);
	yield spawn(updateChaosBagSaga);
}
