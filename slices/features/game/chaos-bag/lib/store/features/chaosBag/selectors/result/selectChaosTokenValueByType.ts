import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosTokenValue } from "../../chaosBag";

export const selectChaosTokenValueByType = (type: ChaosTokenType) =>
	createSelector([selectChaosTokenValue], (values) => {
		if (!values) {
			return 0;
		}

		return values[type] || 0;
	});
