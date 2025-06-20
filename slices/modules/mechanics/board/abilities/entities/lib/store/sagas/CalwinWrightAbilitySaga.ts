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

	if (code !== InvesigatorCode.CalvinWright) {
		return false;
	}

	if (type !== "value") {
		return false;
	}

	return prop === "health" || prop === "sanity";
};

export function* CalwinWrightAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardPropValueChanged>;
	const payload: Payload = yield take(filterAction);

	const { boardId, value, prevValue, prop } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	const diff = value - prevValue;

	const { willpower, intellect, combat, agility } = board.value;

	if (prop === "health") {
		yield put(
			setBoardValuePart({
				boardId,
				type: "value",
				value: {
					combat: combat - diff,
					agility: agility - diff,
				},
			}),
		);
	}

	if (prop === "sanity") {
		yield put(
			setBoardValuePart({
				boardId,
				type: "value",
				value: {
					willpower: willpower - diff,
					intellect: intellect - diff,
				},
			}),
		);
	}
}
