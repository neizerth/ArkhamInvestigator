import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { canRemoveChaosTokenFromBag } from "../../../../logic";

export const selectCanRemoveChaosTokenFromBag = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		canRemoveChaosTokenFromBag({
			tokenCount,
			type,
		}),
	);
