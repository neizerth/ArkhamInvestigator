import type { AppThunk } from "@shared/model";
import { selectCurrentBoard, setCurrentBoardProp } from "../../board";

export const setSkillCheckHistoryItemTitle =
	(id: string, title?: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { checkHistory } = selectCurrentBoard(state);

		const history = checkHistory.map((item) => {
			if (item.id === id) {
				return {
					...item,
					title,
				};
			}

			return item;
		});

		dispatch(setCurrentBoardProp("checkHistory", history));
	};
