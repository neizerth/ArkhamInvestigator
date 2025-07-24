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
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.SisterMary,
	isUsed: false,
});

const BLESS_COUNT = 2;

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
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
			...payload,
			type: "bless",
			count,
		}),
	);
}

export function* SisterMaryAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
