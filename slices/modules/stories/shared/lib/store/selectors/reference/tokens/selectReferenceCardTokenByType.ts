import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectReferenceCardTokens } from "./selectReferenceCardTokens";

export const selectReferenceCardTokenByType = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokens], (tokens) => {
		return tokens.find(propEq(type, "token"));
	});
