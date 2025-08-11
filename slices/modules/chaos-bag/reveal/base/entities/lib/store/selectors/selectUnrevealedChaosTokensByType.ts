import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectUnrevealedChaosTokens } from "./selectUnrevealedChaosTokens";

export const selectUnrevealedChaosTokensByType = (type: ChaosTokenType) =>
	createSelector([selectUnrevealedChaosTokens], (tokens) =>
		tokens.filter(propEq(type, "type")),
	);
