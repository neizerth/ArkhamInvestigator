import type { AppThunk } from "@shared/model";
import type { LimitType } from "arkham-investigator-data";
import { prop, reject } from "ramda";
import { getAbilityLimits } from "../../../../../../features";
import { propIncludes } from "../../../../../../util";
import { selectBoardAbilities, selectBoardProp } from "../../../selectors";
import { setUsedAbilities } from "./setUsedAbilities";

const selectUsedAbilities = selectBoardProp("usedAbilities");

export const resetAbilityLimits =
	(limitTypes: LimitType[]): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const abilities = selectBoardAbilities(state);
		const usedAbilities = selectUsedAbilities(state) || [];

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

		dispatch(setUsedAbilities(data));
	};
