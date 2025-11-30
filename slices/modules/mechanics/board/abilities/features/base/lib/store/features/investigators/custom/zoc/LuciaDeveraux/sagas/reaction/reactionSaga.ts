import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { getResources } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.LuciaDeveraux,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	yield put(getResources({ boardId }));
}

export function* LuciaDeverauxReactionSaga() {
	yield takeEvery(filterAction, worker);
}
