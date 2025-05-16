import type { AppThunk } from "@shared/model";
import {
	setChaosBagSkillCheckExpression,
	setChaosBagSkillCheckTitle,
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
	setRevealedTokenIds,
	setShowRevealChaosTokenModal,
} from "../../../../chaosBag";
import { addRevealHistoryItem } from "../../../history";

export const closeRevealChaosTokenModal = (): AppThunk => (dispatch) => {
	dispatch(addRevealHistoryItem());
	dispatch(setRevealedTokenIds([]));
	dispatch(setChaosBagSkillCheckExpression([]));
	dispatch(setChaosBagSkillValue(null));
	dispatch(setChaosBagSkillCheckType(null));
	dispatch(setChaosBagSkillCheckTitle(null));
	dispatch(setShowRevealChaosTokenModal(false));
};
