import type {
	AppThunk,
	InvestigatorBoardStat,
	SkillCheckItem,
} from "@shared/model";
import {
	setChaosBagSkillCheckExpression,
	setChaosBagSkillCheckTitle,
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
	setRevealedTokenIds,
	setShowRevealChaosTokenModal,
} from "../../../../chaosBag";

type Options = {
	type: InvestigatorBoardStat;
	value: number;
	title?: string | null;
	expression?: SkillCheckItem[];
};
export const openSkillCheckChaosBagModal =
	({ type, value, title, expression = [] }: Options): AppThunk =>
	(dispatch) => {
		dispatch(setRevealedTokenIds([]));

		dispatch(setChaosBagSkillValue(value));
		dispatch(setChaosBagSkillCheckType(type));
		dispatch(setChaosBagSkillCheckTitle(title || null));
		dispatch(setChaosBagSkillCheckExpression(expression));

		dispatch(setShowRevealChaosTokenModal(true));
	};
