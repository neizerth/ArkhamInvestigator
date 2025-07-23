import { clearRevealHistory } from "@modules/chaos-bag/reveal/history/shared/lib";
import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { routes } from "@shared/config";
import { replacePageTo } from "@shared/lib";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(clearRevealHistory());
	yield put(replacePageTo(routes.board));
}

export const clearRevealHistoryModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.clearRevealHistory,
	worker,
});
