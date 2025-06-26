import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagTokenCount } from "../../../chaosBag";

export const selectChaosTokenCount = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (contents) => contents[type] || 0);
