// TODO

import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import {
	addMultipleChaosTokens,
	selectCanAddMultipleChaosTokens,
} from "@modules/chaos-bag/base/entities/lib";
import { select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter("add-2-bless");

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}

	const canAddSelector = selectCanAddMultipleChaosTokens({
		type: "bless",
		count: 2,
	});

	const { available }: ReturnType<typeof canAddSelector> =
		yield select(canAddSelector);

	const count = Math.min(available, 2);

	yield addMultipleChaosTokens({
		type: "bless",
		count,
	});
}

export function* SisterMaryAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
