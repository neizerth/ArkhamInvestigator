import type { AppThunk } from "@shared/model";
import { isNotNil, propEq } from "ramda";
import { selectAbilityById, selectBoardProp } from "../../../selectors";
import { setUsedAbilities } from "./setUsedAbilities";

const selectUsedAbilities = selectBoardProp("usedAbilities");
export const setAbilityUsed =
	(id: string, boardId?: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const selectAbility = selectAbilityById(id);
		const ability = selectAbility(state);

		if (!ability) {
			return;
		}

		if (ability.perInvestigator && !boardId) {
			return;
		}

		const usedAbilities = selectUsedAbilities(state) || [];
		const usedData = usedAbilities.find(propEq(id, "id"));

		const boardIds = usedData?.boardIds || [];

		const item = ability.perInvestigator
			? {
					id,
					boardIds: [...boardIds, boardId].filter(isNotNil),
				}
			: { id };

		const data = [...usedAbilities, item];

		dispatch(setUsedAbilities(data));
	};
