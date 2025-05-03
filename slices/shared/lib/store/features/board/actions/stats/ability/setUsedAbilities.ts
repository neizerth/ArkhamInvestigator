import type { AppThunk, UsedAbility } from "@shared/model";
import { setBoardProp } from "../../board";
import { addCurrentHistoryItem } from "../../history";

export const setUsedAbilities =
	(usedAbilities: UsedAbility[]): AppThunk =>
	(dispatch) => {
		dispatch(setBoardProp("usedAbilities", usedAbilities));
		dispatch(
			addCurrentHistoryItem({
				usedAbilities,
			}),
		);
	};
