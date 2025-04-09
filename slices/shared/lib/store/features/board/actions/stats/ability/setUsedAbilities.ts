import type { AppThunk, UsedAbility } from "@shared/model";
import { setCurrentBoardProp } from "../../board";
import { addCurrentHistoryItem } from "../../history";

export const setUsedAbilities =
	(usedAbilities: UsedAbility[]): AppThunk =>
	(dispatch) => {
		dispatch(setCurrentBoardProp("usedAbilities", usedAbilities));
		dispatch(
			addCurrentHistoryItem({
				usedAbilities,
			}),
		);
	};
