import { getResources } from "@modules/board/base/entities/base/lib";
import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	const boardId = payload.value;

	yield put(getResources({ boardId }));
}

export function* CarolynFernGiveResourceSaga() {
	yield takeEvery(filterAction, worker);
}
