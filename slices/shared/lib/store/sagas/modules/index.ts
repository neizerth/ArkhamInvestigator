import { chaosBagSaga } from "@modules/chaos-bag/sagas";
import { i18nSaga } from "@modules/core/i18n/sagas";
import { modalSaga } from "@modules/core/modal/sagas";
import { soundSaga } from "@modules/core/sound/sagas";
import { mechanicsSaga } from "@modules/mechanics/sagas";
import { spawn } from "redux-saga/effects";
import { boardSaga } from "./board";
import { factionSaga } from "./faction";
import { hapticSaga } from "./haptic";
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

	yield spawn(soundSaga);
	yield spawn(i18nSaga);
}
