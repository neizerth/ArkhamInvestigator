import type { AppThunk, BoardId } from "@shared/model";
import type { LimitType } from "arkham-investigator-data";
import { prop, reject } from "ramda";
import { getAbilityLimits } from "../../../../../../features";
import { propIncludes } from "../../../../../../util";
import { selectBoardAbilities, selectBoardById } from "../../../selectors";
import { setUsedAbilities } from "./setUsedAbilities";

export const resetAbilityLimits =
	(limitTypes: LimitType[], boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const { usedAbilities = [] } = selectBoardById(boardId)(state);
		const abilities = selectBoardAbilities(boardId)(state);

		const ids = abilities
			.filter((ability) => {
				const limits = getAbilityLimits(ability);

				if (!limits) {
					return false;
				}

				return limits.some((limit) => limitTypes.includes(limit));
			})
			.map(prop("id"));

		const data = reject(propIncludes("id", ids), usedAbilities);

		dispatch(setUsedAbilities(data, boardId));
	};
