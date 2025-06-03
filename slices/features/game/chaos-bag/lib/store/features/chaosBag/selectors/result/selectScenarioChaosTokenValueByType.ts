import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectScenarioChaosTokenValue } from "../../chaosBag";

export const selectScenarioChaosTokenValueByType = (type: ChaosTokenType) =>
	createSelector([selectScenarioChaosTokenValue], (values) => {
		if (!values) {
			return 0;
		}

		return values[type] || 0;
	});
