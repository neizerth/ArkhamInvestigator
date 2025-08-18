import { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

import { healHorror } from "../healHorror/healHorror";

const filterAction = (action: unknown) => {
	if (!boardSelectModalConfirmed.match(action)) {
		return false;
	}

	const { payload } = action;
	return payload.modalId === modalId;
};

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	const { boardId, value } = payload;
	yield put(
		healHorror({
			boardId,
			targetBoardId: value,
		}),
	);
}

export function* handleHealModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
