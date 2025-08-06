import { iconMapping } from "@shared/config";
import type { InvestigatorBoardNumericStat } from "@shared/model";

type Options = {
	type: InvestigatorBoardNumericStat | null;
	difficulty: number | null;
};

export const getSkillCheckText = (options: Options) => {
	const { type } = options;
	if (!type) {
		return "";
	}
	const difficulty = options.difficulty || 0;
	const character = type ? `[${iconMapping.stat.simple[type]}]` : "";

	return ` ${character} (${difficulty})`;
};
