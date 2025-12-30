import { spawn } from "redux-saga/effects";
import { syncWithChaosBagSaga } from "./syncWithChaosBagSaga";
import { syncWithSkillTestEnd } from "./syncWithSkillTestEnd";
import { syncWithSkillTestStart } from "./syncWithSkillTestStart";

export function* syncCustomSkillValueSaga() {
	yield spawn(syncWithChaosBagSaga);
	yield spawn(syncWithSkillTestStart);
	yield spawn(syncWithSkillTestEnd);
}
