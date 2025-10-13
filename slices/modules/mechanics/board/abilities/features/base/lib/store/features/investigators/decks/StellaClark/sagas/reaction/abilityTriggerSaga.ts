import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { fail } from "../fail";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.StellaClark.reaction,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId, item } = payload;

	yield put(fail({ boardId, historyId: item.id }));
}

export function* StellaClarkAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
