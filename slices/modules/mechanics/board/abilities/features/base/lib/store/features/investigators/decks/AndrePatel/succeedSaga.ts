import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "ramda-adjunct";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { failed, succeedBy } = action.payload;

	if (failed) {
		return false;
	}

	if (isNumber(succeedBy) && succeedBy >= 2) {
		return true;
	}

	return true;
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { boardId } = payload;

	if (!boardId) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.AndrePatel) {
		return;
	}

	yield put(
		setBoardAbilityUse({
			boardId: board.id,
			abilityId: AbilityCode.AndrePatel,
			canUse: false,
		}),
	);
}

export function* AndrePatelSucceedSaga() {
	yield takeEvery(filterAction, worker);
}
