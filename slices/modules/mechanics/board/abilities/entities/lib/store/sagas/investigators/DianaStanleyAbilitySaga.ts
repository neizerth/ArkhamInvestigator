import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueChanged } from "@modules/board/abilities/shared/lib/store/actions";
import {
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter("diana-cards");

function* worker({ payload }: ReturnType<typeof boardAbilityValueChanged>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

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
