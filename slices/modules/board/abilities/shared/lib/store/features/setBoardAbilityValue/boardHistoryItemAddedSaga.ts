import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { boardAbilityValueSet } from "./setBoardAbilityValue";

function* worker({ payload }: ReturnType<typeof boardHistoryItemAdded>) {
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
			boardAbilityValueSet({
				abilityId,
				boardId,
				value,
				prevValue,
				historyItem: item,
			}),
		);
	}
}

export function* boardHistoryItemAddedSaga() {
	yield takeEvery(boardHistoryItemAdded.match, worker);
}
