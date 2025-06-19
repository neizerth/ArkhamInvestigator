import type { ActionCreatorPayload } from "@shared/model";
import { select, take } from "redux-saga/effects";
import { resetBoardAbilityUseAction } from "../../actions";
import {
	selectBoardAbilityById,
	selectBoardUsedAbilities,
} from "../../selectors";

export function* setBoardAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof resetBoardAbilityUseAction> =
		yield take(resetBoardAbilityUseAction.match);

	const { boardId } = payload;

	const selectAbility = selectBoardAbilityById(payload);

	const ability: ReturnType<typeof selectAbility> = yield select(selectAbility);

	if (!ability) {
		return;
	}

	const selectUsedAbilities = selectBoardUsedAbilities(boardId);

	const usedAbilities: ReturnType<typeof selectUsedAbilities> =
		yield select(selectUsedAbilities);

	// const ability = selectAbility(state);
}
