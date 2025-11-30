import {
	createAbilitySetFilter,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { getClues } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilitySetFilter({
	abilityId: AbilityCode.RexMurphy.base.reaction,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId, canUse } = payload;

	if (canUse) {
		return;
	}

	yield put(getClues({ boardId }));
}

export function* BaseRexMurphyReactionSaga() {
	yield takeEvery(filterAction, worker);
}
