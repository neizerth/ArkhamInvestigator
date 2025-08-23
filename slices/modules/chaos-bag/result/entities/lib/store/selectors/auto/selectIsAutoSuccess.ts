import { isAutoSuccess } from "@modules/chaos-bag/result/shared/lib";
import { selectAllRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsAutoSuccess = createSelector(
	[selectAllRevealedTokens],
	(tokens) => isAutoSuccess({ tokens }),
);
