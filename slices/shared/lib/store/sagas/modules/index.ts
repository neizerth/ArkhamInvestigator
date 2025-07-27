import { spawn } from "redux-saga/effects";
import { boardSaga } from "./board";
import { chaosBagSaga } from "./chaosBag";
import { factionSaga } from "./faction";
import { hapticSaga } from "./haptic";
import { mechanicsSaga } from "./mechanics";
import { modalSaga } from "./modal";
import { notificationsSaga } from "./notifications";
import { skillCheckSaga } from "./skillCheck";

export function* modulesSaga() {
	yield spawn(boardSaga);
	yield spawn(chaosBagSaga);
	yield spawn(skillCheckSaga);
	yield spawn(mechanicsSaga);
	yield spawn(notificationsSaga);
	yield spawn(modalSaga);
	yield spawn(factionSaga);
	yield spawn(hapticSaga);
}
