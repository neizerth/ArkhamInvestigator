import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { getClues, healHorror } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.CarolynFern.chapter2,
	isUsed: false,
});

type Action =
	| ReturnType<typeof healHorror>
	| ReturnType<typeof changeBoardHistoryAbilityUse>;

function* worker({ payload }: Action) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.CarolynFern.chapter2) {
		return;
	}

	yield put(getClues({ boardId }));
}

export function* CarolynFernReactionSaga() {
	yield takeEvery(healHorror, worker);
	yield takeEvery(filterAction, worker);
}
