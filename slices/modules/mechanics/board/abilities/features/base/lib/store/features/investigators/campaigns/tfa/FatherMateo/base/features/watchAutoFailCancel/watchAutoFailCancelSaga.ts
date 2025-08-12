import { selectIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib";
import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { revealedTokenUpdated } from "@modules/chaos-bag/reveal/base/entities/lib";
import { selectChaosBagSkillCheckBoardId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { getIsDefeated } from "@modules/mechanics/board/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { openFatherMateoConfirm } from "../openConfirm/openConfirm";

const filterAction = (action: unknown) => {
	if (!revealedTokenUpdated.match(action)) {
		return false;
	}
	const { payload } = action;
	const { token, data } = payload;

	return token.type === "autoFail" && data.canceled === true;
};

const code = InvesigatorCode.FatherMateo.base;
const abilityId = AbilityCode.FatherMateo.base;

function* worker({ payload }: ReturnType<typeof revealedTokenUpdated>) {
	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	const mateoBoard = boards.find(
		({ investigator }) => investigator.code === code,
	);

	if (!mateoBoard) {
		return;
	}

	const isMateoDefeated = getIsDefeated(mateoBoard.value);

	if (isMateoDefeated) {
		return;
	}

	const abilityUseSelector = selectIsBoardAbilityUsed({
		boardId: mateoBoard.id,
		abilityId,
	});

	const isUsed: ReturnType<typeof abilityUseSelector> =
		yield select(abilityUseSelector);

	if (isUsed) {
		return;
	}

	const boardId: ReturnType<typeof selectChaosBagSkillCheckBoardId> =
		yield select(selectChaosBagSkillCheckBoardId);

	if (!boardId) {
		return;
	}

	yield put(
		openFatherMateoConfirm({
			boardId,
		}),
	);
}

export function* FatherMateoWatchAutoFailCancelSaga() {
	yield takeEvery(filterAction, worker);
}
