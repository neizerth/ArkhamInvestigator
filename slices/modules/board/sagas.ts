import { spawn } from "redux-saga/effects";
import { boardAbilitySaga } from "./abilities/sagas";
import { boardBaseSaga } from "./base/sagas";
import { boardHistorySaga } from "./history/sagas";
import { boardNotificationsSaga } from "./notifications/sagas";
import { boardSkillCheckSaga } from "./skill-check/sagas";

export function* boardSaga() {
	yield spawn(boardBaseSaga);
	yield spawn(boardHistorySaga);
	yield spawn(boardAbilitySaga);
	yield spawn(boardNotificationsSaga);
	yield spawn(boardSkillCheckSaga);
}
