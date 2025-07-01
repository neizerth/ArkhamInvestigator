import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import {
	addMultipleChaosTokens,
	cantAddMultipleChaosTokens,
	selectCanAddMultipleChaosTokens,
} from "@modules/chaos-bag/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter("add-2-bless");

const BLESS_COUNT = 2;

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}

	const canAddSelector = selectCanAddMultipleChaosTokens({
		type: "bless",
		count: BLESS_COUNT,
	});

	const { available }: ReturnType<typeof canAddSelector> =
		yield select(canAddSelector);

	if (available === 0) {
		yield put(
			cantAddMultipleChaosTokens({
				type: "bless",
				count: BLESS_COUNT,
				available,
			}),
		);
		return;
	}

	const count = Math.min(available, BLESS_COUNT);

	yield put(
		addMultipleChaosTokens({
			type: "bless",
			count,
		}),
	);
}

export function* SisterMaryAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
