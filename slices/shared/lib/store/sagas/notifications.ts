import { boardNotificationSharedSaga } from "@modules/board/notifications/entities/lib/store/sagas/index";
import { chaosBagNotificationsFeaturesSaga } from "@modules/chaos-bag/base/features/lib/store/sagas/index";
import { notificationsSharedSaga } from "@modules/core/notifications/shared/lib/store/sagas/index";
import { spawn } from "redux-saga/effects";

export function* notificationSaga() {
	yield spawn(notificationsSharedSaga);

	yield spawn(boardNotificationSharedSaga);

	yield spawn(chaosBagNotificationsFeaturesSaga);
}
