import { spawn } from "redux-saga/effects";
import { boardSaga } from "./board/sagas";
import { chaosBagSaga } from "./chaos-bag/sagas";
import { appSaga } from "./core/app/sagas";
import { assetsSaga } from "./core/assets/sagas";
import { deviceSaga } from "./core/device/sagas";
import { diskSaga } from "./core/disk/sagas";
import { hapticSaga } from "./core/haptic/sagas";
import { i18nSaga } from "./core/i18n/sagas";
import { modalSaga } from "./core/modal/sagas";
import { networkSaga } from "./core/network/sagas";
import { notificationsSaga } from "./core/notifications/sagas";
import { routerSaga } from "./core/router/sagas";
import { soundSaga } from "./core/sound/sagas";
import { factionSaga } from "./faction/sagas";
import { mechanicsSaga } from "./mechanics/sagas";
import { signatureSaga } from "./signature/sagas";

export function* modulesSaga() {
	yield spawn(hapticSaga);
	yield spawn(soundSaga);

	yield spawn(deviceSaga);
	yield spawn(boardSaga);
	yield spawn(chaosBagSaga);
	yield spawn(mechanicsSaga);
	yield spawn(notificationsSaga);
	yield spawn(modalSaga);
	yield spawn(factionSaga);

	yield spawn(i18nSaga);
	yield spawn(assetsSaga);
	yield spawn(signatureSaga);
	yield spawn(diskSaga);
	yield spawn(networkSaga);
	yield spawn(routerSaga);
	yield spawn(appSaga);
}
