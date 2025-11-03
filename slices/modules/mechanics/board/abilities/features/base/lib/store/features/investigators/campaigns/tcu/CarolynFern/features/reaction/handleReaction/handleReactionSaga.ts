import {
	createAbilitySetFilter,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { getResources } from "@modules/board/base/entities/base/lib";
import { selectBoardIds } from "@modules/board/base/shared/lib";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { actionId, modalId } from "../config";

const filterAction = createAbilitySetFilter({
	abilityId: AbilityCode.CarolynFern,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;
	const boardIds: ReturnType<typeof selectBoardIds> =
		yield select(selectBoardIds);

	const boardsCount = boardIds.length;

	if (boardsCount === 0) {
		return;
	}

	if (boardsCount === 1) {
		yield put(getResources({ boardId }));
		return;
	}

	yield put(
		openBoardSelectModal({
			id: modalId,
			data: {
				boardIds,
				title: "Choose an Investigator",
				text: "ability.carolyn.reaction.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: actionId,
					}),
				],
			},
		}),
	);
}

export function* CarolynFernHandleReactionSaga() {
	yield takeEvery(filterAction, worker);
}
