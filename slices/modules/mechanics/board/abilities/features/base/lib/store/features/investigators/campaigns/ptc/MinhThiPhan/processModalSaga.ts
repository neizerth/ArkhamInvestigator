import type { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { addWild } from "./addWild/addWild";
import { modalId } from "./config";

const filterAction = createConfirmModalFilter({
	modalId,
	modalActionId: AbilityCode.MinhThiPhan,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	yield put(
		addWild({
			...payload,
			abilityId: AbilityCode.MinhThiPhan,
			targetBoardId: payload.value,
		}),
	);
}

export function* MinhThiPhanProcessModalConfirmSaga() {
	yield takeEvery(filterAction, worker);
}
