import type { AppThunk, InvestigatorBoardStat } from "@shared/model";
import {
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
	setRevealedTokenIds,
	setShowRevealChaosTokenModal,
} from "../../../chaosBag";

type Options = {
	type: InvestigatorBoardStat;
	value: number;
};
export const openSkillCheckChaosBagModal =
	({ type, value }: Options): AppThunk =>
	(dispatch) => {
		dispatch(setRevealedTokenIds([]));
		dispatch(setChaosBagSkillValue(value));
		dispatch(setChaosBagSkillCheckType(type));
		dispatch(setShowRevealChaosTokenModal(true));
	};
