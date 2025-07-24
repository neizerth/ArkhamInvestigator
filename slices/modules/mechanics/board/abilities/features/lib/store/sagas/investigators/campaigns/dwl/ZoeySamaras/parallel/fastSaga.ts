// TODO revert tokens
import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { removeMultipleChaosTokensByType } from "@modules/chaos-bag/base/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: "remove-3-bless",
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	yield put(
		removeMultipleChaosTokensByType({
			...payload,
			type: "bless",
			count: 3,
		}),
	);
}

export function* ZoeySamarasParallelFastAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
