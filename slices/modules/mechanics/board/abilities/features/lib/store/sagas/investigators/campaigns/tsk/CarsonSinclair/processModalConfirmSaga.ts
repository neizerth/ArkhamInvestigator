import { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { giveAction } from "./giveAction";

const filterAction = (action: unknown) => {
	if (!boardSelectModalConfirmed.match(action)) {
		return false;
	}

	const { payload } = action;

	return payload.modalAction.id === AbilityCode.CarsonSinclair;
};

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	yield put(
		giveAction({
			...payload,
			abilityId: AbilityCode.CarsonSinclair,
			targetBoardId: payload.value,
		}),
	);
}

export function* CarsonSinclairProcessModalConfirmSaga() {
	yield takeEvery(filterAction, worker);
}
