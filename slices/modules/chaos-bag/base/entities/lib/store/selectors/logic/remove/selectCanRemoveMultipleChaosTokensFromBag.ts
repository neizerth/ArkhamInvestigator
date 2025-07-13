import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { canRemoveMultipleChaosTokensFromBag } from "../../../../logic";

type Options = {
	type: ChaosTokenType;
	count: number;
};

export const selectCanRemoveMultipleChaosTokensFromBag = (options: Options) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		canRemoveMultipleChaosTokensFromBag({
			...options,
			tokenCount,
		}),
	);
