import {
	selectBoardByIndex,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { isNull } from "ramda-adjunct";
import { put, select, takeEvery } from "redux-saga/effects";

import { setBoardSystemBar } from "../setBoardSystemBar";

function* worker({ payload }: ReturnType<typeof setCurrentInvestigatorIndex>) {
	if (isNull(payload)) {
		return;
	}
	const boardSelector = selectBoardByIndex(payload);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	yield put(setBoardSystemBar(board.id));
}

export function* watchBoardIndexChangeSaga() {
	yield takeEvery(setCurrentInvestigatorIndex, worker);
}
