import { createBoardAbilityCheckFilter } from "@modules/board/abilities/shared/lib";
import {
	cantRemoveMultipleChaosTokensByType,
	selectChaosTokenCountByType,
} from "@modules/chaos-bag/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

export const filterAction = createBoardAbilityCheckFilter({
	abilityId: AbilityCode.ZoeySamaras.parallel.fast,
	success: false,
});

function* worker() {
	const countSelector = selectChaosTokenCountByType("bless");
	const available: ReturnType<typeof countSelector> =
		yield select(countSelector);

	yield put(
		cantRemoveMultipleChaosTokensByType({
			count: 3,
			type: "bless",
			available,
		}),
	);
}

export function* ZoeySamarasParallelFastAbilityCheckFailedSaga() {
	yield takeEvery(filterAction, worker);
}
