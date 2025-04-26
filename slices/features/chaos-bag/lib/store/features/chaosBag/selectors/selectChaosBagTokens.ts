import { createSelector } from "@reduxjs/toolkit";
import { repeat } from "ramda";
import { v4 } from "uuid";
import { chaosToken } from "../../../../../config";
import { selectChaosBagTokenCount } from "../chaosBag";
export const selectChaosBagTokens = createSelector(
	[selectChaosBagTokenCount],
	(tokensCount) => {
		return chaosToken.types.all
			.flatMap((type) => {
				const count = tokensCount[type] || 0;
				return repeat(type, count);
			})
			.map((type) => ({
				id: v4(),
				type,
			}));
	},
);
