import { healHorror } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { filterElderSignSuccess } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/endChaosBagReveal/filterElderSignSuccess";
import { getBoardHorror } from "@modules/mechanics/board/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = filterElderSignSuccess("success");

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.IsabelleBarnes.core2026) {
		return;
	}

	const horror = getBoardHorror(board);

	if (horror === 0) {
		return;
	}

	yield put(
		healHorror({
			boardId: board.id,
			value: 1,
		}),
	);
}

export function* Core2026IsabelleBarnesElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
