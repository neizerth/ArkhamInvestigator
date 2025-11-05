import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";
import { sealBlessOnBoard } from "../sealBlessOnBoard";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	const { boardId, value } = payload;

	yield put(
		sealBlessOnBoard({
			boardId,
			targetBoardId: value,
		}),
	);
}

export function* ParallelFatherMateoProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
