import { selectReferenceCardTokenEffects } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosBagTokenReferenceEffects } from "../../logic";

export const selectReferenceCardEffects = createSelector(
	[selectReferenceCardTokenEffects],
	(effects) => getChaosBagTokenReferenceEffects(effects),
);
