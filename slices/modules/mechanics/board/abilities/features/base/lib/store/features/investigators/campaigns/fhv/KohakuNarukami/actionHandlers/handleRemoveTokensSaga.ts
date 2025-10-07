import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { removeMultipleChaosTokensByType as removeTokens } from "@modules/chaos-bag/base/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { ActionId } from "../actions";

const filterAction = createModalActionFilter({
	ids: [ActionId.removeTokens],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.KohakuNarukami,
			canUse: false,
			force: true,
		}),
	);

	yield put(
		removeTokens({
			boardId,
			type: "bless",
			count: 2,
		}),
	);
	yield put(
		removeTokens({
			boardId,
			type: "curse",
			count: 2,
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "actions",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.kohaku.removeTokens",
		}),
	);
}

export function* handleRemoveTokensSaga() {
	yield takeEvery(filterAction, worker);
}
