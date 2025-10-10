import { spawn } from "redux-saga/effects";
import { appSaga } from "./app/sagas";
import { assetsSaga } from "./assets/sagas";
import { deviceSaga } from "./device/sagas";
import { diskSaga } from "./disk/sagas";
import { hapticSaga } from "./haptic/sagas";
import { i18nSaga } from "./i18n/sagas";
import { imageSaga } from "./image/sagas";
import { modalSaga } from "./modal/sagas";
import { networkSaga } from "./network/sagas";
import { notificationsSaga } from "./notifications/sagas";
import { routerSaga } from "./router/sagas";
import { soundSaga } from "./sound/sagas";

export function* coreModulesSaga() {
	yield spawn(hapticSaga);
	yield spawn(soundSaga);

	yield spawn(deviceSaga);
	yield spawn(notificationsSaga);
	yield spawn(modalSaga);
	yield spawn(imageSaga);

	yield spawn(i18nSaga);
	yield spawn(assetsSaga);
	yield spawn(diskSaga);
	yield spawn(networkSaga);
	yield spawn(routerSaga);
	yield spawn(appSaga);
}
