import {
	selectBoardValue,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { spendCluesAction } from "./spendClues.action";

export function* spendCluesSaga() {
	type Payload = ActionCreatorPayload<typeof spendCluesAction>;

	const payload: Payload = yield take(spendCluesAction.match);

	const { boardId, value } = payload;

	const selectClues = selectBoardValue({
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
