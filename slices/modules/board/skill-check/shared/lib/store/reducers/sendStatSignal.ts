import type { SkillCheckReducer } from "@modules/board/skill-check/shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { last } from "ramda";
import { createStatItem } from "../../logic";

export const sendStatSignal: SkillCheckReducer<InvestigatorBoardNumericStat> = (
	state,
	{ payload },
) => {
	const { data } = state;
	const lastItem = last(data);

	if (lastItem && ["stat", "number"].includes(lastItem.type)) {
		return {
			...state,
			data: [...data.slice(0, -1), createStatItem(payload)],
		};
	}
	return {
		...state,
		data: [...data, createStatItem(payload)],
	};
};
