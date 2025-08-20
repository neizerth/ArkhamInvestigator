import type { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import { healHorror } from "../healHorror/healHorror";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	const { boardId, value } = payload;
	yield put(
		healHorror({
			boardId,
			targetBoardId: value,
		}),
	);
}

export function* CarolynFernHandleHealModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
