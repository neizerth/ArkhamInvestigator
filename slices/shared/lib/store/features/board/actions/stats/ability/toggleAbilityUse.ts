import type { AppThunk } from "@shared/model";
import {
	selectCurrentBoardProp,
	selectIsAbilityUsed,
} from "../../../selectors";
import { setAbilityUsed } from "./setAbilityUsed";
import { unsetAbilityUse } from "./unsetAbilityUse";

const selectUsedAbilities = selectCurrentBoardProp("usedAbilities");
export const toggleAbilityUse =
	(id: string, boardId?: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const selectIsUsed = selectIsAbilityUsed(id, boardId);
		const isUsed = selectIsUsed(state);

		if (!isUsed) {
			dispatch(setAbilityUsed(id, boardId));
			return;
		}
		dispatch(unsetAbilityUse(id, boardId));
	};
