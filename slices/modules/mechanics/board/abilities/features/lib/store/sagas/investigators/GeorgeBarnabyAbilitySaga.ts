import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueSet } from "@modules/board/abilities/shared/lib";
import {
	isBoardExists,
	selectBoardById,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter(AbilityCode.GeorgeBarnaby);

function* worker({ payload }: ReturnType<typeof boardAbilityValueSet>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	const diff = value - prevValue;

	const baseHandSize = board.baseValue.handSize + diff;
	const handSize = board.value.handSize + diff;

	yield put(
		setBoardPart({
			boardId,
			data: {
				value: {
					handSize,
				},
				baseValue: {
					handSize: baseHandSize,
				},
				initialValue: {
					handSize: baseHandSize,
				},
			},
			history: {
				type: "update",
				id: historyItem.id,
			},
		}),
	);
}

export function* GeorgeBarnabyAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
