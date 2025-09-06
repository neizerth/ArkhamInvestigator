// TODO
import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";
import { processReaction } from "../processReaction";
import { type SelectModalDataResult, selectModalData } from "./selectModalData";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.abilityId === AbilityCode.ReynauldDeChatillon &&
		!payload.abilityTargetBoardId &&
		payload.canUse === false
	);
};

function* worker(action: ReturnType<typeof setBoardAbilityUse>) {
	const modalData: SelectModalDataResult | undefined =
		yield selectModalData(action);

	if (!modalData) {
		return;
	}

	if (modalData.boardIds.length === 1) {
		yield put(
			processReaction({
				...action.payload,
				targetBoardId: modalData.boardIds[0],
			}),
		);
		return;
	}

	const { payload } = action;

	const boardSelector = selectBoardById(payload.boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	yield put(
		openBoardSelectModal({
			id: modalId,
			data: {
				...modalData,
				title: "Choose an Investigator",
				subtitle: board.investigator.name,
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: AbilityCode.ReynauldDeChatillon,
					}),
				],
			},
		}),
	);
}

export function* ReynauldDeChatillonAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
