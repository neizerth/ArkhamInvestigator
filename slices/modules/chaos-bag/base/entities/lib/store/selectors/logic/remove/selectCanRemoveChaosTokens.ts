import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { canRemoveChaosTokens } from "../../../../logic";

type Options = {
	type: ChaosTokenType;
	count: number;
};

export const selectCanRemoveChaosTokens = (options: Options) =>
	createSelector([selectChaosBagTokenCount], (tokenCount) =>
		canRemoveChaosTokens({
			...options,
			tokenCount,
		}),
	);
