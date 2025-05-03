import type { AppThunk } from "@shared/model";
import { selectCurrentBoard, setBoardProp } from "../../board";

export const toggleSkillCheckHistoryItemPin =
	(id: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { checkHistory } = selectCurrentBoard(state);

		const history = checkHistory.map((item) => {
			if (item.id === id) {
				return {
					...item,
					pinned: !item.pinned,
				};
			}

			return item;
		});

		dispatch(setBoardProp("checkHistory", history));
	};
