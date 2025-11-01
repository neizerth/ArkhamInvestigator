import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.RolandBanks,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "clues",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "clues.get",
			data: {
				count: 1,
			},
		}),
	);
}

export function* RolandBanksAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
