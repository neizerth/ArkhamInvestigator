import { abilitiesSharedSaga } from "@modules/board/abilities/shared/lib/store/sagas";
import { boardSharedSaga } from "@modules/board/base/shared/lib/store/sagas";
import { boardHistorySharedSaga } from "@modules/board/history/shared/lib/store/sagas";
import { boardNotificationSharedSaga } from "@modules/board/notifications/entities/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* boardSaga() {
	yield spawn(boardSharedSaga);
	yield spawn(boardHistorySharedSaga);

	yield spawn(abilitiesSharedSaga);

	yield spawn(boardNotificationSharedSaga);
}
