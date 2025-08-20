import type { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "./config";
import { giveAction } from "./giveAction/sagas";

const filterAction = createConfirmModalFilter({
	modalId,
	modalActionId: AbilityCode.CarsonSinclair,
});

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
