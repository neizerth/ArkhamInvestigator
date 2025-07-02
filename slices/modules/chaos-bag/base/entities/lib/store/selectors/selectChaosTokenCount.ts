import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagTokenCount } from "../../../../shared/lib/store/chaosBag";
import { getChaosTokenCountByType } from "../../logic";

export const selectChaosTokenCountByType = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		getChaosTokenCountByType({
			type,
			tokenCount,
		}),
	);
