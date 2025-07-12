import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/config";
import { openCustomModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter("role-switch");

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}
	// TODO change modal module
	yield put(
		openCustomModal({
			id: CustomModalId.factionSelect,
		}),
	);
	// yield put(setShowFactionSelect(true));
}

export function* LolaHayesAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
