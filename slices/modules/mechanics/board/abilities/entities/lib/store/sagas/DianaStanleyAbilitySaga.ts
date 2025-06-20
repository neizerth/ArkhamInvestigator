import { createAbilityActionFilter } from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueChanged } from "@modules/board/abilities/shared/lib/store/actions";
import {
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";

const filterAction = createAbilityActionFilter("diana-cards");

export function* DianaStanleyAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardAbilityValueChanged>;
	const payload: Payload = yield take(filterAction);

	const { boardId, value, prevValue } = payload;

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
		}),
	);
}
