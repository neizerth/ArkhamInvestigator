import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

import { selectReferenceCardTokenByType } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getReferenceCardChaosTokenOptions } from "../../../logic";

export const selectReferenceCardChaosTokenOptions = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokenByType(type)], (item) => {
		if (!item) {
			return [];
		}

		return getReferenceCardChaosTokenOptions(item);
	});
