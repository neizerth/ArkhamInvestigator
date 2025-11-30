import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { changeSkillValueToBaseIntellect } from "../changeSkillValueToBaseIntellect";
import { modalId } from "../config";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

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
