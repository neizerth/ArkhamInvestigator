import type { SkillCheckReducer } from "@modules/board/skill-check/shared/model";
import { last } from "ramda";
import { createNumberItem } from "../../logic";

type Payload =
	| number
	| {
			value: number;
			removable?: boolean;
	  };

export const sendNumberSignal: SkillCheckReducer<Payload> = (state, action) => {
	const { data } = state;
	const lastItem = last(data);

	const payload: Payload =
		typeof action.payload === "number"
			? { value: action.payload }
			: action.payload;

	const { value, removable } = payload;
	if (lastItem?.type === "number") {
		const itemValue = lastItem.removable ? value : lastItem.value * 10 + value;
		return {
			...state,
			data: [...data.slice(0, -1), createNumberItem(itemValue, removable)],
		};
	}
	if (lastItem?.type === "stat") {
		return {
			...state,
			data: [...data.slice(0, -1), createNumberItem(value, removable)],
		};
	}

	return {
		...state,
		data: [...data, createNumberItem(value, removable)],
	};
};
