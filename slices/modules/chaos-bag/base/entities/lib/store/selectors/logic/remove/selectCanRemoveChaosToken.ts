import type { ChaosTokenType } from "@features/game/chaos-bag/model";
import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { canRemoveChaosToken } from "../../../../logic";

export const selectCanRemoveChaosToken = (type: ChaosTokenType) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		canRemoveChaosToken({
			tokenCount,
			type,
		}),
	);
