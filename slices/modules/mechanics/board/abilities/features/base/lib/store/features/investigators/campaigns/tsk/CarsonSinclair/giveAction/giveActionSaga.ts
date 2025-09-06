import {
	selectBoardAbilityById,
	selectBoardAbilityUseInfo,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import {
	decreaseBoardActualPropValue,
	increaseBoardActualPropValue,
	selectCurrentBoard,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { giveAction } from "./giveAction";

function* worker({ payload }: ReturnType<typeof giveAction>) {
	const { targetBoardId, abilityId, boardId } = payload;

	const abiliySelector = selectBoardAbilityById({
		abilityId,
		boardId,
	});

	const ability: ReturnType<typeof abiliySelector> =
		yield select(abiliySelector);

	if (!ability) {
		return;
	}

	const board: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	const useInfoSelector = selectBoardAbilityUseInfo({
		boardId,
		abilityId,
	});

	const useInfo: ReturnType<typeof useInfoSelector> =
		yield select(useInfoSelector);

	yield put(
		setBoardAbilityUse({
			abilityId,
			boardId,
			abilityTargetBoardId: targetBoardId,
			canUse: false,
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			sourceBoardId: boardId,
			boardId: targetBoardId,
			prop: "actions",
		}),
	);

	const targetCount = useInfo?.boardIds?.length || 0;
	const minDecreaseCount = ability.additionalAction ? 1 : 0;

	if (targetCount >= minDecreaseCount) {
		yield put(
			decreaseBoardActualPropValue({
				boardId,
				prop: "actions",
			}),
		);
	}

	yield put(
		sendInvestigatorNotification({
			boardId: targetBoardId,
			sourceBoardId: boardId,
			message: "actions.give",
			data: {
				count: 1,
			},
		}),
	);
}

export function* giveActionSaga() {
	yield takeEvery(giveAction.match, worker);
}
