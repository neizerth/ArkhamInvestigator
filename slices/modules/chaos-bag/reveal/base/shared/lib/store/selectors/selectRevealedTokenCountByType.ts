import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectRevealedTokens } from "../chaosBagReveal";

export const selectRevealedTokenCountByType = (type: ChaosTokenType) =>
	createSelector(
		[selectRevealedTokens],
		(tokens) => tokens.filter(propEq(type, "type")).length,
	);
