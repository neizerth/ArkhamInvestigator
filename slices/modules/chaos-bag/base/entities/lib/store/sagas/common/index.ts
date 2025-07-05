import { spawn } from "redux-saga/effects";
import { createChaosBagSaga } from "./createChaosBagSaga";
import { setCustomChaosBagSkillValueSaga } from "./setCustomChaosBagSkillValueSaga";
import { updateChaosBagSaga } from "./updateChaosBagSaga";

export function* commonChaosBagSaga() {
	yield spawn(setCustomChaosBagSkillValueSaga);

	yield spawn(createChaosBagSaga);
	yield spawn(updateChaosBagSaga);
}
