import {
	selectBoardActualPropValue,
	setBoardPropValue,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { spendClues } from "./spendClues";

function* worker({ payload }: ReturnType<typeof spendClues>) {
	const { boardId, value } = payload;

	const selectClues = selectBoardActualPropValue({
		boardId,
		prop: "clues",
	});

	const clues: ReturnType<typeof selectClues> = yield select(selectClues);

	if (clues < value) {
		return;
	}

	const updatedClues = clues - value;

	yield put(
		setBoardPropValue({
			boardId,
			type: "value",
			prop: "clues",
			value: updatedClues,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "clues.spent",
			data: {
				count: value,
			},
		}),
	);
}

export function* spendCluesSaga() {
	yield takeEvery(spendClues.match, worker);
}
