import {
	type changeBoardHistoryAbilityUse,
	createAbilityValueFilter,
} from "@modules/board/abilities/shared/lib";
import { setShowFactionSelect } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter("role-switch");

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}

	yield put(setShowFactionSelect(true));
}

export function* LolaHayesAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
