import type { AppThunk, InvestigatorBoardStat } from "@shared/model";
import {
	setChaosBagSkillCheckTitle,
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
	setRevealedTokenIds,
	setShowRevealChaosTokenModal,
} from "../../../chaosBag";

type Options = {
	type: InvestigatorBoardStat;
	value: number;
	title?: string | null;
};
export const openSkillCheckChaosBagModal =
	({ type, value, title }: Options): AppThunk =>
	(dispatch) => {
		dispatch(setRevealedTokenIds([]));
		dispatch(setChaosBagSkillValue(value));
		dispatch(setChaosBagSkillCheckType(type));
		dispatch(setChaosBagSkillCheckTitle(title || null));
		dispatch(setShowRevealChaosTokenModal(true));
	};
