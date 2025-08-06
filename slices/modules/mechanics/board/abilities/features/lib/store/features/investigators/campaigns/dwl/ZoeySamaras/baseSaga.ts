// TODO revert tokens
import {
	createAbilityUseFilter,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.ZoeySamaras.base,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "resources",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "investigator.getResources",
			data: {
				count: 1,
			},
		}),
	);
}

export function* ZoeySamarasBaseReactionAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
