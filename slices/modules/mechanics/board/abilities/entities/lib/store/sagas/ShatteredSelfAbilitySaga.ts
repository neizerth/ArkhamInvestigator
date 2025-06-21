import {
	boardPropValueChanged,
	selectBoardById,
	setBoardValuePart,
} from "@modules/board/base/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/shared/config";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!boardPropValueChanged.match(action)) {
		return false;
	}
	const { code, prop, type } = action.payload;

	if (code !== InvesigatorCode.ShatteredSelf) {
		return false;
	}

	if (type !== "value") {
		return false;
	}

	return prop === "handSize";
};

export function* ShatteredSelfAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardPropValueChanged>;
	const payload: Payload = yield take(filterAction);

	const { boardId, value, prevValue, prop } = payload;

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
