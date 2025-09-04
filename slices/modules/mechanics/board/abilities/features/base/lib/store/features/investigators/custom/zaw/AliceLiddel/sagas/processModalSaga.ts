import { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { changeSkillValueToBaseIntellect } from "../changeSkillValueToBaseIntellect";

const abilityId = AbilityCode.AliceLiddell;

const filterAction = (action: unknown) => {
	if (!boardSelectModalConfirmed.match(action)) {
		return false;
	}

	const { payload } = action;

	return payload.modalAction.id === AbilityCode.AliceLiddell;
};

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	yield put(
		changeSkillValueToBaseIntellect({
			...payload,
			abilityId: AbilityCode.AliceLiddell,
			targetBoardId: payload.value,
		}),
	);
}

export function* AliceLiddelProcessModalConfirmSaga() {
	yield takeEvery(filterAction, worker);
}
