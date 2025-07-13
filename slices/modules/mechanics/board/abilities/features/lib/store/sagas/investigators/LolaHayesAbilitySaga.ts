import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter("role-switch");

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}
	yield put(
		openModal({
			id: CustomModalId.factionSelect,
		}),
	);
}

export function* LolaHayesAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
