import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import { selectChaosBagContents } from "../chaosBag";

export const selectChaosBagTokenById = (id: string) =>
	createSelector([selectChaosBagContents], (chaosTokens) =>
		chaosTokens.find(whereId(id)),
	);
