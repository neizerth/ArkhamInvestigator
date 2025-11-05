import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { triggerFastAbility } from "../triggerFastAbility";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.abilityId === AbilityCode.FatherMateo.parallel &&
		payload.canUse === false &&
		!payload.force
	);
};

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	yield put(triggerFastAbility(payload));
}

export function* ParallelFatherMateoOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
