import {
	selectBoardUsedAbilities,
	setBoardUsedAbilities,
} from "@modules/board/base/shared/lib";
import { propIncludes } from "@shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { prop, reject } from "ramda";
import { put, select, take } from "redux-saga/effects";
import { getAbilityLimits } from "../../info";
import { resetBoardAbilitiesAction } from "../actions";
import { selectBoardAbilities } from "../selectors";

export function* resetBoardAbilitiesSaga() {
	const payload: ActionCreatorPayload<typeof resetBoardAbilitiesAction> =
		yield take(resetBoardAbilitiesAction.match);
	const { boardId, limitTypes = [] } = payload;

	const usedAbilitiesSelector = selectBoardUsedAbilities(boardId);

	const usedAbilities: ReturnType<typeof usedAbilitiesSelector> = yield select(
		usedAbilitiesSelector,
	);

	if (!usedAbilities) {
		return;
	}

	const boardAbilitiesSelector = selectBoardAbilities(boardId);
	const boardAbilities: ReturnType<typeof boardAbilitiesSelector> =
		yield select(boardAbilitiesSelector);

	const selectAll = limitTypes.length === 0;

	const ids = boardAbilities
		.filter((ability) => {
			if (selectAll) {
				return true;
			}
			const limits = getAbilityLimits(ability);

			if (!limits) {
				return false;
			}

			return limits.some((limit) => limitTypes.includes(limit));
		})
		.map(prop("id"));

	const value = reject(propIncludes("id", ids), usedAbilities);

	yield put(
		setBoardUsedAbilities({
			...payload,
			value,
		}),
	);
}
