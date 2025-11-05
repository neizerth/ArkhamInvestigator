import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { addWild } from "./addWild";
import { modalId } from "./config";
import { type SelectModalDataResult, selectModalData } from "./selectModalData";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.abilityId === AbilityCode.MinhThiPhan &&
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

	const boardsCount = modalData.boardIds.length;

	if (boardsCount === 0) {
		return;
	}

	if (boardsCount === 1) {
		yield put(
			addWild({
				...action.payload,
				targetBoardId: modalData.boardIds[0],
			}),
		);
		return;
	}

	yield put(
		openBoardSelectModal({
			id: modalId,
			data: {
				...modalData,
				title: "Choose an Investigator",
				subtitle: "Add wild",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: AbilityCode.MinhThiPhan,
					}),
				],
			},
		}),
	);
}

export function* MinhThiPhanAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
