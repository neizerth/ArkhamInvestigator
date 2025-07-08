import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueSet } from "@modules/board/abilities/shared/lib/store/actions";
import {
	isBoardExists,
	selectBoardById,
	setBoardValuePart,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter("ravenous");

function* worker({ payload }: ReturnType<typeof boardAbilityValueSet>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	const diff = Math.min(5, value) - Math.min(5, prevValue);

	if (diff === 0) {
		return;
	}

	const { willpower, intellect, combat, agility } = board.value;

	const change = {
		willpower: willpower + diff,
		intellect: intellect + diff,
		combat: combat + diff,
		agility: agility + diff,
	};

	yield put(
		setBoardValuePart({
			boardId,
			type: "value",
			value: change,
			history: {
				type: "update",
				id: historyItem.id,
			},
		}),
	);
}

export function* Subject5U21AbilitySaga() {
	yield takeEvery(filterAction, worker);
}
