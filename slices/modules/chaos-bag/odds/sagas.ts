import { spawn } from "redux-saga/effects";
import { syncCustomSkillValueSaga } from "./features/sync-custom-skill-value/sagas";

export function* chaosBagOddsSaga() {
	yield spawn(syncCustomSkillValueSaga);
}
