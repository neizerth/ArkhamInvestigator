import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { spendResources } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.EdmundMoore,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	yield put(
		spendResources({
			boardId,
			value: 2,
		}),
	);
}

export function* EdmundMooreFastAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
