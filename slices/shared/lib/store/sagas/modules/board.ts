import { abilitiesSharedSaga } from "@modules/board/abilities/shared/lib/store/sagas/index";
import { boardSharedSaga } from "@modules/board/base/shared/lib/store/sagas/index";
import { boardHistorySharedSaga } from "@modules/board/history/shared/lib/store/sagas/index";
import { boardNotificationSharedSaga } from "@modules/board/notifications/entities/lib/store/sagas/index";
import { spawn } from "redux-saga/effects";

export function* boardSagas() {
	yield spawn(boardSharedSaga);
	yield spawn(boardHistorySharedSaga);

	yield spawn(abilitiesSharedSaga);

	yield spawn(boardNotificationSharedSaga);
}
