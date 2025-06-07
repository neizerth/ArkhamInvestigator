import type { AppThunk } from "@shared/model";
import {
	setChaosBagSkillCheckExpression,
	setChaosBagSkillCheckTitle,
	setChaosBagSkillValue,
} from "../../../chaosBag";

export const updateChaosBagSkillValue =
	(value: number): AppThunk =>
	(dispatch) => {
		dispatch(setChaosBagSkillCheckExpression([]));
		dispatch(setChaosBagSkillCheckTitle(null));
		dispatch(setChaosBagSkillValue(value));
	};
