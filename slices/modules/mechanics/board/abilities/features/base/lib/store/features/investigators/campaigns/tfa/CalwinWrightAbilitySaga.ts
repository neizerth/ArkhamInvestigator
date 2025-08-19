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

	if (typeof item.value.health === "number") {
		const baseValueChange = item.baseValue?.health ?? board.baseValue.health;
		const baseDiff = baseValueChange - board.baseValue.health;
		const valueDiff = item.value.health - board.value.health;

		const diff = valueDiff - baseDiff;

		const combat = board.value.combat - diff;
		const agility = board.value.agility - diff;

		if (diff === 0 || combat < 0 || agility < 0) {
			return;
		}

		yield put(
			setBoardValuePart({
				boardId,
				type: "value",
				value: {
					combat,
					agility,
				},
				history: {
					type: "update",
					id: item.id,
				},
			}),
		);
	}

	if (typeof item.value.sanity === "number") {
		const baseValueChange = item.baseValue?.sanity ?? board.baseValue.sanity;
		const baseDiff = baseValueChange - board.baseValue.sanity;
		const valueDiff = item.value.sanity - board.value.sanity;

		const diff = valueDiff - baseDiff;

		const willpower = board.value.willpower - diff;
		const intellect = board.value.intellect - diff;

		if (diff === 0 || intellect < 0 || willpower < 0) {
			return;
		}

		yield put(
			setBoardValuePart({
				boardId,
				type: "value",
				value: {
					willpower,
					intellect,
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
