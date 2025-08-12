import { selectIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib";
import { selectBoardByCode } from "@modules/board/base/shared/lib";
import { revealedTokenUpdated } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	selectChaosBagSkillCheckBoardId,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { getIsDefeated } from "@modules/mechanics/board/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { whereId } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { elderSignTokenId } from "../../../config";
import { openFatherMateoConfirm } from "../openConfirm";

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
	const boardSelector = selectBoardByCode(code);
	const mateoBoard: ReturnType<typeof boardSelector> =
		yield select(boardSelector);

	if (!mateoBoard.id) {
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

	const revealed: ReturnType<typeof selectRevealedTokens> =
		yield select(selectRevealedTokens);

	const isElderSignRevealed = revealed.some(whereId(elderSignTokenId));

	if (isElderSignRevealed) {
		return false;
	}

	const boardId: ReturnType<typeof selectChaosBagSkillCheckBoardId> =
		yield select(selectChaosBagSkillCheckBoardId);

	if (!boardId) {
		return;
	}

	yield put(
		openFatherMateoConfirm({
			boardId,
			sourceBoardId: mateoBoard.id,
		}),
	);
}

export function* FatherMateoWatchAutoFailCancelSaga() {
	yield takeEvery(filterAction, worker);
}
