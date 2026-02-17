import type { changeBoardHistoryAbilityUse } from "@modules/board/abilities/shared/lib";
import { createAbilityUseFilter } from "@modules/board/abilities/shared/lib/store/util";
import { takeHorror } from "@modules/board/base/entities/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.IsabelleBarnes.core2026.fast,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	yield put(
		takeHorror({
			boardId,
			value: 1,
		}),
	);
}

export function* Core2026IsabelleBarnesFastSaga() {
	yield takeEvery(filterAction, worker);
}
