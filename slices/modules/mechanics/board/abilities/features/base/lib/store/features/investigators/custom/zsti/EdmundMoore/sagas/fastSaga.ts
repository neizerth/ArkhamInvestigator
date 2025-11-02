import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { decreaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.EdmundMoore,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	yield put(
		decreaseBoardActualPropValue({
			boardId,
			prop: "resources",
			value: 2,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "resources.spent",
			data: {
				count: 2,
			},
		}),
	);
}

export function* EdmundMooreFastAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
