import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectCurrentInvestigatorIndex,
	setCurrentInvestigatorIndex,
} from "../../../board";
import { selectBoardsCount } from "../../../selectors";
import { setPrevBoardIndex } from "./setPrevBoardIndex";

function* worker() {
	const boardsCount: ReturnType<typeof selectBoardsCount> =
		yield select(selectBoardsCount);

	const currentIndex: ReturnType<typeof selectCurrentInvestigatorIndex> =
		yield select(selectCurrentInvestigatorIndex);

	const index = currentIndex ?? 0;

	if (index < 0 || boardsCount < 2) {
		return;
	}

	const prevIndex = index === 0 ? boardsCount - 1 : index - 1;

	yield put(setCurrentInvestigatorIndex(prevIndex));
}

export function* setPrevBoardIndexSaga() {
	yield takeEvery(setPrevBoardIndex.match, worker);
}
