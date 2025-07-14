import { selectModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import { selectChaosBagSkillValue } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RootState } from "@shared/model";

export const selectShowSkillCheckResult = (state: RootState) => {
	const skillValue = selectChaosBagSkillValue(state);
	const modifyEnabled = selectModifyChaosTokens(state);
	return modifyEnabled && typeof skillValue === "number";
};
