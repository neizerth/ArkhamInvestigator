import { spawn } from "redux-saga/effects";
import { skillCheckEntitiesSaga } from "./entities/sagas";
import { skillCheckSharedSaga } from "./shared/sagas";

export function* boardSkillCheckSaga() {
	yield spawn(skillCheckSharedSaga);
	yield spawn(skillCheckEntitiesSaga);
}
