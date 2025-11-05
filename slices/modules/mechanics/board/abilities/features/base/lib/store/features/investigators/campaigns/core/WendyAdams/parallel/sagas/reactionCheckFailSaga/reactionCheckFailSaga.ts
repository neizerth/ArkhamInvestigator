import {
	type checkBoardAbilityUseFailed,
	createBoardAbilityCheckFilter,
} from "@modules/board/abilities/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createBoardAbilityCheckFilter({
	abilityId: AbilityCode.WendyAdams.parallel,
	success: false,
});

function* worker({ payload }: ReturnType<typeof checkBoardAbilityUseFailed>) {
	const { boardId } = payload;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.wendy.parallel.reaction.fail",
			type: "error",
		}),
	);
}

export function* ParallelWendyAdamsReactionCheckFailSaga() {
	yield takeEvery(filterAction, worker);
}
