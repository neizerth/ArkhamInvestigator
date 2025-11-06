import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectAvailableTokens } from "./selectAvailableTokens";

export const selectAvailableTokenCountByType = (type: ChaosTokenType) =>
	createSelector(
		[selectAvailableTokens],
		(availableTokens) => availableTokens.filter(propEq(type, "type")).length,
	);
