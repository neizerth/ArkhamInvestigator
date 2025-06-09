import type { AppThunk } from "@shared/model";
import { selectIsAbilityUsed } from "../../../selectors";
import { setAbilityUsed } from "./setAbilityUsed";
import { unsetAbilityUse } from "./unsetAbilityUse";

export const toggleAbilityUse =
	(id: string, boardId?: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const selectIsUsed = selectIsAbilityUsed(id, boardId);
		const isUsed = selectIsUsed(state);

		if (!isUsed) {
			dispatch(setAbilityUsed(id, boardId));
		} else {
			dispatch(unsetAbilityUse(id, boardId));
		}
	};
