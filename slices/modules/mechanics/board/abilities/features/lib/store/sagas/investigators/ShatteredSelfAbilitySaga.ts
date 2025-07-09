import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueSet } from "@modules/board/abilities/shared/lib/store/actions";
import {
	selectBoardById,
	setBoardValuePart,
} from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter(AbilityCode.ShatteredSelf);

function* worker({ payload }: ReturnType<typeof boardAbilityValueSet>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	const diff = Math.min(5, value) - Math.min(5, prevValue);

	yield put(
		setBoardValuePart({
			boardId,
			type: "value",
			value: {
				willpower: board.value.willpower + diff,
				intellect: board.value.intellect + diff,
				combat: board.value.combat + diff,
				agility: board.value.agility + diff,
			},
			history: {
				type: "update",
				id: historyItem.id,
			},
		}),
	);
}

export function* ShatteredSelfAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
