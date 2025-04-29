import type { AppThunk } from "@shared/model";
import {
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
	setRevealedTokenIds,
	setShowRevealChaosTokenModal,
} from "../../../chaosBag";

export const closeRevealChaosTokenModal = (): AppThunk => (dispatch) => {
	dispatch(setRevealedTokenIds([]));
	dispatch(setChaosBagSkillValue(null));
	dispatch(setChaosBagSkillCheckType(null));
	dispatch(setShowRevealChaosTokenModal(false));
};
