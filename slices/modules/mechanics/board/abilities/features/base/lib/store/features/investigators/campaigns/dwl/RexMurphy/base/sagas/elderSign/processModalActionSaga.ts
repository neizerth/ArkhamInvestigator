import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { setRevealedTokenValue } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "./config";

const filterAction = createConfirmModalFilter({
	modalId,
	modalActionId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;

	yield put(
		setRevealedTokenValue({
			type: "elderSign",
			value: "fail",
			changeType: "last",
			modify: true,
		}),
	);

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.RexMurphy.base.elderSign,
			canUse: false,
		}),
	);
}

export function* BaseRexMurphyProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
