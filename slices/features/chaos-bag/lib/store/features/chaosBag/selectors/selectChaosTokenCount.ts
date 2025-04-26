import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../model";
import { selectChaosBagContents } from "../chaosBag";

export const selectChaosTokenCount = (type: ChaosTokenType) =>
	createSelector([selectChaosBagContents], (contents) => contents[type] || 0);
