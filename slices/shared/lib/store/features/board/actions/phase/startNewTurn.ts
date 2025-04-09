import type { AppThunk } from "@shared/model";
import { TURN_ABILITY_LIMITS } from "../../../../../../config";
import { selectCurrentStatBaseValue } from "../../selectors";
import { setCurrentStat, setValueTransaction } from "../stats";
import { resetAbilityLimits } from "../stats/ability/resetAbilityLimits";

const selectHaveAdditionalActions =
	selectCurrentStatBaseValue("additionalAction");
const selectBaseValue = selectCurrentStatBaseValue("actions");

export const startNewTurn = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const baseValue = selectBaseValue(state);
	const haveAdditionalActions = selectHaveAdditionalActions(state);

	dispatch(resetAbilityLimits(TURN_ABILITY_LIMITS));

	if (haveAdditionalActions) {
		dispatch(
			setValueTransaction({
				additionalAction: true,
				actions: baseValue,
			}),
		);
		return;
	}

	dispatch(setCurrentStat("actions", baseValue));
};
