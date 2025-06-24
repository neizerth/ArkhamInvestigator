import {
	type changeBoardHistoryAbilityUse,
	createAbilityValueFilter,
} from "@modules/board/abilities/shared/lib";
import { setShowFactionSelect } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";

const filterAction = createAbilityValueFilter("role-switch");

export function* LolaHayesAbilitySaga() {
	type Payload = ActionCreatorPayload<typeof changeBoardHistoryAbilityUse>;
	const payload: Payload = yield take(filterAction);

	const { changedAbilities } = payload;

	const [ability] = changedAbilities;

	if (ability.isUsed) {
		return;
	}

	yield put(setShowFactionSelect(true));
}
