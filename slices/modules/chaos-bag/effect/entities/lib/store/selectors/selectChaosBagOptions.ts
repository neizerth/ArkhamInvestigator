import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

import { selectReferenceCardTokens } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";

export const selectReferenceCardChaosTokenOptions = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokens], (data) => {
		const item = data.find(propEq(type, "token"));

		switch (item?.type) {
			case "value":
			case "select":
				return item.options ?? [];
			default:
				return [];
		}
	});
