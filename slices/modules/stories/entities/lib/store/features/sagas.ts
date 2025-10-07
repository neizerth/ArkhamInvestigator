import { spawn } from "redux-saga/effects";
import { fillChaosBagDifficultySaga } from "./fillChaosBagDifficulty/fillChaosBagDifficultySaga";

export function* storiesEntitiesSaga() {
	yield spawn(fillChaosBagDifficultySaga);
}
