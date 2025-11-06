import { healDamage } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { getBoardDamage } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const damage = getBoardDamage(board);

	if (damage === 0) {
		return;
	}

	yield put(
		healDamage({
			boardId,
		}),
	);
}

export function* ParallelAgnesBakerHealModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
