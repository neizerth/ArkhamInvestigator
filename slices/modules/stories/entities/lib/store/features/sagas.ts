import { spawn } from "redux-saga/effects";
import { changeStorySaga } from "./changeStory/changeStorySaga";
import { fillChaosBagDifficultySaga } from "./fillChaosBagDifficulty/fillChaosBagDifficultySaga";

export function* storiesEntitiesSaga() {
	yield spawn(fillChaosBagDifficultySaga);
	yield spawn(changeStorySaga);
}
