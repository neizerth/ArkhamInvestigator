import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

import { healDamage } from "../healDamage/healDamage";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

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
