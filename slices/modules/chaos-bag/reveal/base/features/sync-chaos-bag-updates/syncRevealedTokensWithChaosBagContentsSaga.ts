import { boardAbilityUseSet } from "@modules/board/abilities/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	chaosBagUpdated,
	selectChaosBagContents,
} from "@modules/chaos-bag/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { syncRevealedValuesWithContents } from "../../shared/lib";

const filterAction = (action: unknown) => {
	if (!chaosBagUpdated.match(action)) {
		return false;
	}

	return Boolean(action.payload.boardId);
};

type Action = PayloadAction<PropsWithBoardId>;

function* worker({ payload }: Action) {
	const { boardId } = payload;
	const contents: ReturnType<typeof selectChaosBagContents> = yield select(
		selectChaosBagContents,
	);

	const valuesSelector = selectChaosBagTokenValues(boardId);

	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);

	yield put(
		syncRevealedValuesWithContents({
			contents,
			values,
		}),
	);
}

export function* syncRevealedTokensWithChaosBagContentsSaga() {
	yield takeEvery(filterAction, worker);
	yield takeEvery(boardAbilityUseSet, worker);
}
