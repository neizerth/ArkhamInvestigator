// TODO revert tokens
import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import {
	addSingleChaosToken,
	cantAddSingleChaosToken,
	selectCanAddChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.SisterMary,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const canAddSelector = selectCanAddChaosToken("bless");

	const validation: ReturnType<typeof canAddSelector> =
		yield select(canAddSelector);

	const { available } = validation;

	if (available === 0) {
		yield put(
			cantAddSingleChaosToken({
				...validation,
				type: "bless",
			}),
		);
		return;
	}

	yield put(
		addSingleChaosToken({
			...payload,
			source: "effect",
			type: "bless",
		}),
	);
}

export function* SisterMaryAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
