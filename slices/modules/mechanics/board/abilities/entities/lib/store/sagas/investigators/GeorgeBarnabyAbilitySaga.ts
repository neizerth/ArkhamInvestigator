import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueChanged } from "@modules/board/abilities/shared/lib/store/actions";
import { selectBoardById, setBoardPart } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter("george-cards");

function* worker({ payload }: ReturnType<typeof boardAbilityValueChanged>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
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
