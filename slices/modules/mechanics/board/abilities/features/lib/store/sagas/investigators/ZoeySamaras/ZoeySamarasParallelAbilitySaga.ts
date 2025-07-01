import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { addChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter("add-bless");

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}

	yield put(
		addChaosToken({
			type: "bless",
		}),
	);
}

export function* ZoeySamarasParallelAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
