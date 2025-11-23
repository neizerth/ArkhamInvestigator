import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

import { selectReferenceCardTokenByType } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectReferenceCardChaosTokenOptions = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokenByType(type)], (item) => {
		switch (item?.type) {
			case "value":
			case "select":
				return item.options ?? [];
			default:
				return [];
		}
	});
