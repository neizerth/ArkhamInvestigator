import { selectBoardValueProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	boardValuesLimit,
	maxRegularValue,
} from "@modules/mechanics/board/base/entities/config";
import type { InvestigatorNumericStat, RootState } from "@shared/model";

type Options = PropsWithBoardId & {
	prop: InvestigatorNumericStat;
};

export const selectBoardMaxValue =
	({ boardId, prop }: Options) =>
	(state: RootState) => {
		const baseValue = selectBoardValueProp({
			boardId,
			type: "baseValue",
			prop,
		})(state);

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
	};
