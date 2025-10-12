import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { decreaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { setRevealedTokenValue } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;

	yield put(
		setRevealedTokenValue({
			type: "elderSign",
			value: "success",
			changeType: "last",
			modify: true,
		}),
	);

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.PrestonFairmont.elderSign,
			canUse: false,
		}),
	);

	yield put(
		decreaseBoardActualPropValue({
			boardId,
			prop: "resources",
			value: 2,
		}),
	);
}

export function* PrestonFairmontConfirmModalSaga() {
	yield takeEvery(filterAction, worker);
}
