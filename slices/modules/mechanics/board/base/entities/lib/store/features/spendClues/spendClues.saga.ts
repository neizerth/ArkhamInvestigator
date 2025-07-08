import {
	selectBoardActualPropValue,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { spendClues } from "./spendClues.action";

function* worker({ payload }: ReturnType<typeof spendClues>) {
	const { boardId, value } = payload;

	const selectClues = selectBoardActualPropValue({
		boardId,
		prop: "clues",
	});

	const clues: ReturnType<typeof selectClues> = yield select(selectClues);

	if (typeof clues !== "number") {
		return;
	}

	if (clues < value) {
		return;
	}

	const updatedClues = clues - value;

	yield put(
		setBoardActualPropValue({
			boardId,
			prop: "clues",
			value: updatedClues,
		}),
	);
}

export function* spendCluesSaga() {
	yield takeEvery(spendClues.match, worker);
}
