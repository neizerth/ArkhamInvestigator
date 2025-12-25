import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

import { selectReferenceCardTokenByType } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { formatChaosTokenValue } from "../../logic";

export const selectChaosTokenDefaultValue = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokenByType(type)], (item) => {
		if (!item) {
			return 0;
		}

		if (item.type === "value" || item.type === "select") {
			return formatChaosTokenValue(item.config.modifier);
		}

		return item.value ?? 0;
	});
