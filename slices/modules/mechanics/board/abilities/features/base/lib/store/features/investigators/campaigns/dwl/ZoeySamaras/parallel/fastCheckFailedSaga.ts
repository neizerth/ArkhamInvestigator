import {
	type checkBoardAbilityUseFailed,
	createBoardAbilityCheckFilter,
} from "@modules/board/abilities/shared/lib";
import { selectChaosTokenCountByType } from "@modules/chaos-bag/base/entities/lib";
import { cantRemoveChaosTokens } from "@modules/chaos-bag/base/entities/lib/store/features/remove/removeChaosTokens/cantRemoveChaosTokens";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createBoardAbilityCheckFilter({
	abilityId: AbilityCode.ZoeySamaras.parallel.fast,
	success: false,
});

function* worker({ payload }: ReturnType<typeof checkBoardAbilityUseFailed>) {
	const countSelector = selectChaosTokenCountByType("bless");
	const available: ReturnType<typeof countSelector> =
		yield select(countSelector);

	yield put(
		cantRemoveChaosTokens({
			...payload,
			count: 3,
			type: "bless",
			available,
		}),
	);
}

export function* ZoeySamarasParallelFastAbilityCheckFailedSaga() {
	yield takeEvery(filterAction, worker);
}
