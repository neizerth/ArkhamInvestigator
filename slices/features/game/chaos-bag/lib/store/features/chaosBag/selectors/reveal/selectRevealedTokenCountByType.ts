import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import type { ChaosTokenType } from "../../../../../../model";
import { selectRevealedTokens } from "./selectRevealedTokens";

export const selectRevealedTokenCountByType = (type: ChaosTokenType) =>
	createSelector(
		[selectRevealedTokens],
		(tokens) => tokens.filter(propEq(type, "type")).length,
	);
