import type { ChaosTokenType } from "@features/game/chaos-bag/model";
import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { canRemoveChaosTokenFromBag } from "../../../../logic";

export const selectCanRemoveChaosTokenFromBag = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		canRemoveChaosTokenFromBag({
			tokenCount,
			type,
		}),
	);
