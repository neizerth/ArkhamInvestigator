import { clearRevealHistory } from "@modules/chaos-bag/reveal/history/shared/lib";
import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(clearRevealHistory());
	yield put(
		goToPage({
			href: routes.board,
			replace: true,
		}),
	);
}

export const clearRevealHistoryModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.clearRevealHistory,
	worker,
});
