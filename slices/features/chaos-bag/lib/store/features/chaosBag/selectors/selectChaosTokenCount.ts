import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../model";
import { selectChaosBagTokenCount } from "../chaosBag";

export const selectChaosTokenCount = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (contents) => contents[type] || 0);
