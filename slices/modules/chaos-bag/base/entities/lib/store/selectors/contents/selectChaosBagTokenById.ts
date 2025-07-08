import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";

export const selectChaosBagTokenById = (id: string) =>
	createSelector([selectChaosBagContents], (chaosTokens) =>
		chaosTokens.find(whereId(id)),
	);
