import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { createSelector } from "@reduxjs/toolkit";
import { ascend, sortWith } from "ramda";
import { selectChaosBagContents } from "../../chaosBag";

export const selectOrderedChaosBagContents = createSelector(
	[selectChaosBagContents],
	(contents) =>
		sortWith(
			[
				ascend(({ sealed }) => (sealed ? 0 : 1)),

				ascend(({ type }) => chaosToken.types.order[type]),
			],
			contents,
		),
);
