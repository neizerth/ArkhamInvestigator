import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectOrderedChaosBagContents } from "./selectOrderedChaosBagContents";

export const selectChaosBagTokensByType = (type: ChaosTokenType) =>
	createSelector([selectOrderedChaosBagContents], (tokens) =>
		tokens.filter(propEq(type, "type")),
	);
