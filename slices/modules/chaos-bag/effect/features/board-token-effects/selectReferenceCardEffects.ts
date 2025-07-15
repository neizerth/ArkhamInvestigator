import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenEffects } from "@shared/lib";
import { getChaosBagTokenReferenceEffects } from "../../entities/lib";

export const selectReferenceCardEffects = createSelector(
	[selectReferenceCardTokenEffects],
	(effects) => getChaosBagTokenReferenceEffects(effects),
);
