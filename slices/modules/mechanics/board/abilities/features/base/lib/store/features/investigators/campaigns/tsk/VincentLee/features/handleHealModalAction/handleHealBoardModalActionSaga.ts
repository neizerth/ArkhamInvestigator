import { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

import { healDamage } from "../healDamage/healDamage";

const filterAction = (action: unknown) => {
	if (!boardSelectModalConfirmed.match(action)) {
		return false;
	}

	return action.payload.modalId === modalId;
};

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	const { boardId, value } = payload;

	yield put(
		healDamage({
			boardId,
			targetBoardId: value,
		}),
	);
}

export function* VincentLeeHandleHealModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
