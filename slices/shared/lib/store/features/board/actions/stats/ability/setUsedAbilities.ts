import type { AppThunk, BoardId, UsedAbility } from "@shared/model";
import { setBoardProp } from "../../board";
import { addCurrentHistoryItem } from "../../history";

export const setUsedAbilities =
	(usedAbilities: UsedAbility[], boardId?: BoardId): AppThunk =>
	(dispatch) => {
		dispatch(setBoardProp("usedAbilities", usedAbilities, boardId));
		dispatch(
			addCurrentHistoryItem(
				{
					usedAbilities,
				},
				boardId,
			),
		);
	};
