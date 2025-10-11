import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import type { InvestigatorBoardHistoryItem } from "../../model";

type Options = {
	history: InvestigatorBoardHistoryItem[];
	initialUsedAbilities?: InvestigatorBoardUsedAbility[];
	historyIndex: number;
};

export const getHistoryUsedAbilities = (options: Options) => {
	const { history, initialUsedAbilities = [], historyIndex } = options;

	for (let i = historyIndex; i >= 0; i--) {
		const item = history[i];
		if (item.usedAbilities) {
			return item.usedAbilities;
		}
	}

	return initialUsedAbilities;
};
