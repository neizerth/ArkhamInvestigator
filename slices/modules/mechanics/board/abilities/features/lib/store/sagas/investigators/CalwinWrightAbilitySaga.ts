import { setBoardValuePart } from "@modules/board/base/shared/lib";
import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!boardHistoryItemAdded.match(action)) {
		return false;
	}
	const { code, item } = action.payload;

	if (code !== InvesigatorCode.CalvinWright) {
		return false;
	}

	const { value } = item;

	return typeof value?.health === "number" || typeof value?.sanity === "number";
};

function* worker({ payload }: ReturnType<typeof boardHistoryItemAdded>) {
	const { boardId, item, board } = payload;

	if (!item.value) {
		return;
	}

	const { willpower, intellect, combat, agility } = board.value;

	if (typeof item.value.health === "number") {
		const diff = item.value.health - board.value.health;

		yield put(
			setBoardValuePart({
				boardId,
				type: "value",
				value: {
					combat: combat - diff,
					agility: agility - diff,
				},
				history: {
					type: "update",
					id: item.id,
				},
			}),
		);
	}

	if (typeof item.value.sanity === "number") {
		const diff = item.value.sanity - board.value.sanity;

		yield put(
			setBoardValuePart({
				boardId,
				type: "value",
				value: {
					willpower: willpower - diff,
					intellect: intellect - diff,
				},
				history: {
					type: "update",
					id: item.id,
				},
			}),
		);
	}
}

export function* CalwinWrightAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
