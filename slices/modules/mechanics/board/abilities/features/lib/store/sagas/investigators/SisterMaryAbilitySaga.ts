// TODO revert tokens
import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import {
	addMultipleChaosTokens,
	cantAddMultipleChaosTokens,
	selectCanAddMultipleChaosTokens,
} from "@modules/chaos-bag/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter(AbilityCode.SisterMary);

const BLESS_COUNT = 2;

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	console.log({ ability });

	if (ability.isUsed) {
		return;
	}

	const canAddSelector = selectCanAddMultipleChaosTokens({
		type: "bless",
		count: BLESS_COUNT,
	});

	const validation: ReturnType<typeof canAddSelector> =
		yield select(canAddSelector);

	const { available } = validation;

	if (available === 0) {
		yield put(
			cantAddMultipleChaosTokens({
				...validation,
				type: "bless",
				count: BLESS_COUNT,
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
