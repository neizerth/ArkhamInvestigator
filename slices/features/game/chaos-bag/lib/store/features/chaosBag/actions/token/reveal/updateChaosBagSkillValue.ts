import type { AppThunk } from "@shared/model";
import {
	selectRevealHistoryItem,
	setChaosBagSkillCheckExpression,
	setChaosBagSkillCheckTitle,
	setChaosBagSkillValue,
	setRevealHistoryItem,
} from "../../../chaosBag";

export const updateChaosBagSkillValue =
	(value: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		dispatch(setChaosBagSkillCheckExpression([]));
		dispatch(setChaosBagSkillCheckTitle(null));
		dispatch(setChaosBagSkillValue(value));

		const historyItem = selectRevealHistoryItem(state);

		if (!historyItem) {
			return;
		}

		dispatch(
			setRevealHistoryItem({
				...historyItem,
				skillCheckValue: value,
			}),
		);
	};
