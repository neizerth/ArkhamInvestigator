import { createAbilityValueFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueChanged } from "@modules/board/abilities/shared/lib/store/actions";
import { selectBoardById, setBoardPart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";

const filterAction = createAbilityValueFilter(["george-cards"]);

export function* GeorgeBarnabyAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardAbilityValueChanged>;
	const payload: Payload = yield take(filterAction);

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
