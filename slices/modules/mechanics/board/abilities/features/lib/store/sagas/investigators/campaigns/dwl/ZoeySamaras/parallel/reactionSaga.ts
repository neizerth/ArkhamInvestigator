// TODO revert tokens
import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { addChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.ZoeySamaras.parallel.reaction,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	yield put(
		addChaosToken({
			...payload,
			type: "bless",
		}),
	);
}

export function* ZoeySamarasParallelReactionAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
