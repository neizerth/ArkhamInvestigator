import { chaosBagSaga } from "@modules/chaos-bag/sagas";
import { appSaga } from "@modules/core/app/sagas";
import { assetsSaga } from "@modules/core/assets/sagas";
import { deviceSaga } from "@modules/core/device/sagas";
import { diskSaga } from "@modules/core/disk/sagas";
import { hapticSaga } from "@modules/core/haptic/sagas";
import { i18nSaga } from "@modules/core/i18n/sagas";
import { modalSaga } from "@modules/core/modal/sagas";
import { networkSaga } from "@modules/core/network/sagas";
import { notificationsSaga } from "@modules/core/notifications/sagas";
import { soundSaga } from "@modules/core/sound/sagas";
import { factionSaga } from "@modules/faction/sagas";
import { mechanicsSaga } from "@modules/mechanics/sagas";
import { signatureSaga } from "@modules/signature/sagas";
import { spawn } from "redux-saga/effects";
import { boardSaga } from "./board";
import { skillCheckSaga } from "./skillCheck";

export function* modulesSaga() {
	yield spawn(hapticSaga);
	yield spawn(soundSaga);

	yield spawn(deviceSaga);
	yield spawn(boardSaga);
	yield spawn(chaosBagSaga);
	yield spawn(skillCheckSaga);
	yield spawn(mechanicsSaga);
	yield spawn(notificationsSaga);
	yield spawn(modalSaga);
	yield spawn(factionSaga);

	yield spawn(i18nSaga);
	yield spawn(assetsSaga);
	yield spawn(signatureSaga);
	yield spawn(diskSaga);
	yield spawn(networkSaga);
	yield spawn(appSaga);
}
