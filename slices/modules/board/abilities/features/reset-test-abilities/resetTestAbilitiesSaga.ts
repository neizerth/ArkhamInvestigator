import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { resetBoardAbilities } from "../../shared/lib";

const filterAction = (action: unknown) => {
	if (!endChaosBagReveal.match(action)) {
		return false;
	}

	return Boolean(action.payload.boardId);
};

function* worker({ payload }: PayloadAction<PropsWithBoardId>) {
	const { boardId } = payload;

	yield put(
		resetBoardAbilities({
			boardId,
			limitTypes: ["test"],
		}),
	);
}

export function* resetTestAbilitiesSaga() {
	yield takeEvery(filterAction, worker);
}
