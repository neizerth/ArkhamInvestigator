import { createAbilitySetFilter } from "@modules/board/abilities/shared/lib";
import type { changeBoardHistoryAbilityUse } from "@modules/board/abilities/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilitySetFilter({
	abilityId: AbilityCode.AgathaCrane,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;
	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.agatha.reaction",
		}),
	);
}

export function* AgathaCraneReactionSaga() {
	yield takeEvery(filterAction, worker);
}
