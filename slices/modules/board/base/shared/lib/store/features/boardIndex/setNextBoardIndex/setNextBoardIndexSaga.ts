import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
} from "../../../board";
import { selectBoardsCount } from "../../../selectors";
import { setNextBoardIndex } from "./setNextBoardIndex";

function* worker() {
	const boardsCount: ReturnType<typeof selectBoardsCount> =
		yield select(selectBoardsCount);

	const currentIndex: ReturnType<typeof selectCurrentInvestigatorIndex> =
		yield select(selectCurrentInvestigatorIndex);

	const index = currentIndex ?? 0;

	if (index < 0 || boardsCount < 2) {
		return;
	}

	const nextIndex = (index + 1) % boardsCount;

	yield put(setCurrentInvestigatorIndex(nextIndex));
}

export function* setNextBoardIndexSaga() {
	yield takeEvery(setNextBoardIndex.match, worker);
}
