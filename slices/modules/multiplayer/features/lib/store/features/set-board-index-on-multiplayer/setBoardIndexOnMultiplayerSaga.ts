import { selectPlayerBoards } from "@modules/board/base/entities/base/lib";
import {
	setCurrentInvestigatorIndex,
	setInvestigatorBoards,
} from "@modules/board/base/shared/lib";
import { selectGameMode } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);

	if (gameMode !== "multiplayer") {
		return;
	}

	const boards: ReturnType<typeof selectPlayerBoards> =
		yield select(selectPlayerBoards);
	const [firstBoard] = boards;

	if (!firstBoard) {
		return;
	}

	yield put(setCurrentInvestigatorIndex(firstBoard.index));
}

export function* setBoardIndexOnMultiplayerSaga() {
	yield takeEvery(setInvestigatorBoards.match, worker);
}
