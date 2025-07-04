import type { SkillCheckReducer } from "@modules/board/skill-check/shared/model";
import { createNumberItem } from "../../logic";

export const sendResultSignal: SkillCheckReducer<number> = (
	state,
	{ payload },
) => {
	return {
		...state,
		data: [createNumberItem(payload, true)],
	};
};
