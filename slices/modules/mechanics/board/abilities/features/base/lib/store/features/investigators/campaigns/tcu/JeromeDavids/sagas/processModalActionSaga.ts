import { getClues } from "@modules/board/base/entities/base/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;

	yield put(
		getClues({
			boardId,
		}),
	);
}

export function* JeromeDavidsProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
