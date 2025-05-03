import type { AppThunk } from "@shared/model";
import { isNotNil } from "ramda";
import { whereId } from "../../../../../../util";
import { selectAbilityById, selectCurrentBoardProp } from "../../../selectors";
import { setUsedAbilities } from "./setUsedAbilities";

const selectUsedAbilities = selectCurrentBoardProp("usedAbilities");
export const setAbilityUsed =
	(id: string, boardId?: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const selectAbility = selectAbilityById(id);
		const ability = selectAbility(state);

		if (!ability) {
			return;
		}

		if (ability.perInvestigator && boardId === undefined) {
			return;
		}

		const usedAbilities = selectUsedAbilities(state) || [];
		const index = usedAbilities.findIndex(whereId(id));
		const usedData = usedAbilities[index];

		const boardIds = usedData?.boardIds || [];

		const item = ability.perInvestigator
			? {
					id,
					boardIds: [...boardIds, boardId].filter(isNotNil),
				}
			: { id };

		const data =
			ability.perInvestigator && index >= 0
				? usedAbilities.with(index, item)
				: [...usedAbilities, item];

		dispatch(setUsedAbilities(data));
	};
