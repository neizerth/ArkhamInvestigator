import type { SkillCheckReducer } from "@modules/board/skill-check/shared/model";
import type { SkillCheckCommandType } from "@shared/model";
import { last } from "ramda";
import { createNumberItem, createStatItem } from "../../../signalItems";

export const sendCommandSignal: SkillCheckReducer<SkillCheckCommandType> = (
	state,
	{ payload },
) => {
	const { type, data } = state;

	if (!type || payload === "empty") {
		return {
			...state,
			data: [],
		};
	}

	const lastItem = last(data);

	switch (payload) {
		case "clear":
			return {
				...state,
				data: [createStatItem(type)],
			};
		case "clear-last": {
			if (lastItem?.type === "number" && lastItem.value > 9) {
				const value = Math.floor(lastItem.value / 10);

				return {
					...state,
					data: [...state.data.slice(0, -1), createNumberItem(value)],
				};
			}
			const nextData = state.data.slice(0, -1);
			return {
				...state,
				data: nextData.length === 0 ? [createStatItem(type)] : nextData,
			};
		}
	}
};
