import type { AppThunk } from "@shared/model";
import { equals, reject } from "ramda";
import { whereId } from "../../../../../../util";
import { selectAbilityById, selectCurrentBoardProp } from "../../../selectors";
import { setUsedAbilities } from "./setUsedAbilities";

const selectUsedAbilities = selectCurrentBoardProp("usedAbilities");

export const unsetAbilityUse =
	(id: string, boardId?: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const selectAbility = selectAbilityById(id);
		const ability = selectAbility(state);

		if (!ability) {
			return;
		}

		const usedAbilities = selectUsedAbilities(state) || [];
		const usedData = usedAbilities.find(whereId(id));

		if (!usedData) {
			return;
		}

		const data = reject(whereId(id), usedAbilities);

		if (!ability.perInvestigator || !boardId) {
			dispatch(setUsedAbilities(data));

			return;
		}

		const boardIds = reject(equals(boardId), usedData?.boardIds || []);

		if (boardIds.length === 0) {
			dispatch(setUsedAbilities(data));
			return;
		}

		const item = {
			id,
			boardIds,
		};

		dispatch(setUsedAbilities([...data, item]));
	};
