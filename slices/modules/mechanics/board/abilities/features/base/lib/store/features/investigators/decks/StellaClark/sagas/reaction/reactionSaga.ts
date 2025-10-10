import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { fail } from "../fail";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { failed, skillCheckBoardId } = action.payload;

	return failed === true && Boolean(skillCheckBoardId);
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.StellaClark) {
		return;
	}

	yield put(fail({ boardId: skillCheckBoardId }));
}

export function* StellaClarkReactionSaga() {
	yield takeEvery(filterAction, worker);
}
