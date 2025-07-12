import { skillCheckSharedSaga } from "@modules/board/skill-check/shared/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* skillCheckSaga() {
	yield spawn(skillCheckSharedSaga);
}
