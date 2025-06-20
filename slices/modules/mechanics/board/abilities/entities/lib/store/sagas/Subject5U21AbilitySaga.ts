import { createAbilityActionFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueChanged } from "@modules/board/abilities/shared/lib/store/actions";
import {
	selectBoardById,
	setBoardValuePart,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";

const filterAction = createAbilityActionFilter("ravenous");

export function* Subject5U21AbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardAbilityValueChanged>;
	const payload: Payload = yield take(filterAction);

	const { boardId, value, prevValue } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
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
		}),
	);
}
