import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosTokenCountCanBeRemoved } from "../../../../logic";

export const selectChaosTokenCountCanBeRemovedFromBag = (
	type: ChaosTokenType,
) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		getChaosTokenCountCanBeRemoved({
			type,
			tokenCount,
		}),
	);
