import type { InvestigatorBoardStat } from "@shared/model";
import { last } from "ramda";
import { createStatItem } from "../lib";
import type { SkillCheckReducer } from "../skillCheck.types";

export const sendStatSignal: SkillCheckReducer<InvestigatorBoardStat> = (
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
