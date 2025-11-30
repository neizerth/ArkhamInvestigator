import { getChaosTokenCountByType } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagTokenCount } from "../../../../shared/lib/store/chaosBag";

export const selectChaosTokenCountByType = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		getChaosTokenCountByType({
			type,
			tokenCount,
		}),
	);
