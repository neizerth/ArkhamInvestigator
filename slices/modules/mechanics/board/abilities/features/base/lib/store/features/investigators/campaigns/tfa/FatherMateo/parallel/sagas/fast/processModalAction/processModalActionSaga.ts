import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { elderSignModalId, modalId } from "../config";
import { sealBlessOnBoard } from "../sealBlessOnBoard";

const filterBlessAction = createConfirmBoardSelectModalFilter({
	modalId,
});

const filterElderSignAction = createConfirmBoardSelectModalFilter({
	modalId: elderSignModalId,
});

const filterAction = (action: unknown) =>
	filterBlessAction(action) || filterElderSignAction(action);

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
	yield takeEvery(filterElderSignAction, worker);
}
