import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.JoeDiamond.core2026.reaction,
	isUsed: false,
});
function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	yield put(
		sendInvestigatorNotification({
			boardId: payload.boardId,
			message: "ability.joe.core2026.reaction",
		}),
	);
}

export function* Core2026JoeDiamondReactionSaga() {
	yield takeEvery(filterAction, worker);
}
