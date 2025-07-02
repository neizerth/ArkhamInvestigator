import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { canRemoveMultipleChaosTokens } from "../../../../logic";

type Options = {
	type: ChaosTokenType;
	count: number;
};

export const selectCanRemoveMultipleChaosTokens = (options: Options) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		canRemoveMultipleChaosTokens({
			...options,
			tokenCount,
		}),
	);
