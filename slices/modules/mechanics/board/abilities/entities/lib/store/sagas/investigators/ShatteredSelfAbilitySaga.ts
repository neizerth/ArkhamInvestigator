import { setBoardValuePart } from "@modules/board/base/shared/lib";
import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!boardHistoryItemAdded.match(action)) {
		return false;
	}
	const { code, item } = action.payload;

	if (code !== InvesigatorCode.ShatteredSelf) {
		return false;
	}

	return typeof item.value?.handSize === "number";
};

export function* ShatteredSelfAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof boardHistoryItemAdded>;
	const payload: Payload = yield take(filterAction);

	const { boardId, board, item } = payload;

	const handSize = item.value?.handSize;

	if (typeof handSize !== "number") {
		return;
	}

	const prevValue = board.value.handSize;

	const diff = Math.min(5, handSize) - Math.min(5, prevValue);

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
			history: {
				type: "update",
				id: item.id,
			},
		}),
	);
}
