import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "./config";
import { giveAction } from "./giveAction/sagas";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	if (!payload.value) {
		return;
	}
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
