import { isAutoFail } from "@modules/chaos-bag/result/shared/lib";
import { selectAllRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsAutoFail = createSelector(
	[selectAllRevealedTokens],
	(tokens) => isAutoFail({ tokens }),
);
