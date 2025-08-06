import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueSet } from "@modules/board/abilities/shared/lib";
import {
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter(AbilityCode.DianaStanley);

function* worker({ payload }: ReturnType<typeof boardAbilityValueSet>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	const diff = value - prevValue;

	const willpower = board.value.willpower + diff;

	yield put(
		setBoardActualPropValue({
			boardId,
			prop: "willpower",
			value: willpower,
			history: {
				type: "update",
				id: historyItem.id,
			},
		}),
	);
}

export function* DianaStanleyAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
