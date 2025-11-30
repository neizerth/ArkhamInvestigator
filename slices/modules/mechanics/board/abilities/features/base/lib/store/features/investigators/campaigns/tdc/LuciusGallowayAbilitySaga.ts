import type { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { createAbilityUseFilter } from "@modules/board/abilities/shared/lib/store/util";
import { getClues } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.LuciusGalloway,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	yield put(getClues({ boardId }));
}

export function* LuciusGallowayAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
