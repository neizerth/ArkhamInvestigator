import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenEffects } from "@shared/lib";
import { getChaosBagTokenReferenceEffects } from "../../logic";

export const selectReferenceCardEffects = createSelector(
	[selectReferenceCardTokenEffects],
	(effects) => getChaosBagTokenReferenceEffects(effects),
);
