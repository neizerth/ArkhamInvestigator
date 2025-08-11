import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { removeChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: "remove-3-bless",
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

export function* ZoeySamarasParallelFastAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
