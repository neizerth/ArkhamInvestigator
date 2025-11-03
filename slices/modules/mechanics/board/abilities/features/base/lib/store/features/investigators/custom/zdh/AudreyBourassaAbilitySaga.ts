import type { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { createAbilityUseFilter } from "@modules/board/abilities/shared/lib/store/util";
import { getResources } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.AudreyBourassa,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	yield put(getResources({ boardId, count: 2 }));
}

export function* AudreyBourassaAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
