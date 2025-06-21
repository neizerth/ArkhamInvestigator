import { selectBoardValueProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	boardValuesLimit,
	maxRegularValue,
} from "@modules/mechanics/board/base/shared/config";
import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";

type Options = PropsWithBoardId & {
	prop: InvestigatorNumericStat;
};

export const selectBoardMaxValue = ({ boardId, prop }: Options) =>
	createSelector(
		[
			selectBoardValueProp({
				boardId,
				type: "baseValue",
				prop,
			}),
		],
		(baseValue) => {
			switch (prop) {
				case "health":
				case "sanity":

				case "handSize":

				case "willpower":
				case "intellect":
				case "combat":
				case "agility":
					return baseValue ?? Number.POSITIVE_INFINITY;
				default:
					return boardValuesLimit.max[prop] ?? maxRegularValue;
			}
		},
	);
