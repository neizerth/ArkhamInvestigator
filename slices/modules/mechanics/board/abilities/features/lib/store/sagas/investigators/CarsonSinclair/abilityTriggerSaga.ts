import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { type SelectModalDataResult, selectModalData } from "./selectModalData";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.abilityId === AbilityCode.CarsonSinclair &&
		!payload.abilityTargetBoardId &&
		payload.use === false
	);
};

function* worker(action: ReturnType<typeof setBoardAbilityUse>) {
	const modalData: SelectModalDataResult | undefined =
		yield selectModalData(action);

	if (!modalData) {
		return;
	}

	yield put(
		openBoardSelectModal({
			id: "carson-sinclair-board-select",
			data: {
				...modalData,
				title: "Choose an Investigator",
				subtitle: "Give an action",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: AbilityCode.CarsonSinclair,
					}),
				],
			},
		}),
	);
}

export function* CarsonSinclairAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
