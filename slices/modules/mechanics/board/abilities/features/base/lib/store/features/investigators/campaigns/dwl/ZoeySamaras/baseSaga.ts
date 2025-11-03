// TODO revert tokens
import {
	createAbilityUseFilter,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { getResources } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.ZoeySamaras.base,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	yield put(getResources({ boardId }));
}

export function* ZoeySamarasBaseReactionAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
