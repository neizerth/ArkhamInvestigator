import { createAbilityActionFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueChanged } from "@modules/board/abilities/shared/lib/store/actions";
import {
	selectBoardById,
	setBoardValuePropPart,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";

const filterAction = createAbilityActionFilter("george-cards");

export function* GeorgeBarnabyAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardAbilityValueChanged>;
	const payload: Payload = yield take(filterAction);

	const { boardId, value, prevValue } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	const diff = value - prevValue;

	const baseValue = board.baseValue.handSize + diff;
	const handSize = board.value.handSize + diff;

	yield put(
		setBoardValuePropPart({
			boardId,
			prop: "handSize",
			value: handSize,
			baseValue,
		}),
	);
}
