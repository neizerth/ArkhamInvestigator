import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { getClues, getResources } from "@modules/board/base/entities/base/lib";
import type { BoardActualPropChangePayload } from "@modules/board/base/entities/base/model";
import { selectBoardUsedAbilities } from "@modules/board/base/shared/lib";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { getUnusedEffects } from "../../lib";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId, modalAction } = payload;

	const { effects } = AbilityCode.RichardCarlisle;
	const abilityId = modalAction.id;

	const history = createBoardHistoryGroup();

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId,
			canUse: false,
			history,
		}),
	);

	const increasePayload: BoardActualPropChangePayload = {
		boardId,
		history,
	};

	switch (abilityId) {
		case effects.clue:
			yield put(getClues(increasePayload));
			break;
		case effects.resource:
			yield put(getResources(increasePayload));
			break;
		case effects.damage:
			yield put(
				sendInvestigatorNotification({
					boardId,
					message: "ability.richard.damage",
				}),
			);
			break;
		case effects.card:
			yield put(
				sendInvestigatorNotification({
					boardId,
					message: "card.get",
					data: {
						count: 1,
					},
				}),
			);
			break;
	}

	const usedAbilitiesSelector = selectBoardUsedAbilities(boardId);
	const usedAbilities: ReturnType<typeof usedAbilitiesSelector> = yield select(
		usedAbilitiesSelector,
	);

	const unusedCount = getUnusedEffects(usedAbilities);

	if (unusedCount.length === 1) {
		yield put(
			setBoardAbilityUse({
				boardId,
				abilityId: AbilityCode.RichardCarlisle.reaction,
				canUse: false,
				force: true,
				history,
			}),
		);
	}
}

export function* RichardCarlisleHandleModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
