import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { boardAbilityValueChanged } from "../actions";

export function* boardHistoryItemAddedSaga() {
	type Payload = ActionCreatorPayload<typeof boardHistoryItemAdded>;
	const payload: Payload = yield take(boardHistoryItemAdded.match);

	const { item, board, boardId } = payload;

	if (!item.abilityValues) {
		return;
	}

	const abilityIds = Object.keys(item.abilityValues);

	for (const abilityId of abilityIds) {
		const prevValue = board.abilityValues?.[abilityId] || 0;
		const value = item.abilityValues[abilityId] || 0;

		if (prevValue === value) {
			continue;
		}

		yield put(
			boardAbilityValueChanged({
				abilityId,
				boardId,
				value,
				prevValue,
				historyItem: item,
			}),
		);
	}
}
