import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { removeChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.ZoeySamaras.parallel.fast,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	yield put(
		removeChaosTokens({
			...payload,
			removeType: "multiple",
			source: "effect",
			type: "bless",
			count: 3,
		}),
	);
}

export function* ParallelZoeySamarasRemoveChaosTokensSaga() {
	yield takeEvery(filterAction, worker);
}
