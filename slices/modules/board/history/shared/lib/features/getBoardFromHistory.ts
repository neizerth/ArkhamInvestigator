import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import type { InvestigatorBoardHistoryItem } from "../../model";
import { getBoardValueFromHistory } from "./getBoardValueFromHistory";
import { getHistoryUsedAbilities } from "./getHistoryUsedAbilities";

type Options = {
	cleanBoard: InvestigatorBoard;
	board: InvestigatorBoard;
	history: InvestigatorBoardHistoryItem[];
	historyIndex: number;
};

export const getBoardFromHistory = (options: Options): InvestigatorBoard => {
	const { board, history, historyIndex, cleanBoard } = options;

	if (historyIndex === -1) {
		return {
			...cleanBoard,
			history,
		};
	}

	const lastItem = history[historyIndex];
	const faction = lastItem?.faction;
	const usedAbilities = getHistoryUsedAbilities({
		history,
		initialUsedAbilities: cleanBoard.initialUsedAbilities,
		historyIndex,
	});

	const historyItems = history.slice(0, historyIndex + 1);

	const values = getBoardValueFromHistory({
		board: cleanBoard,
		historyItems,
	});

	const item = {
		...board,
		...values,
		usedAbilities,
		faction,
		historyIndex,
	};

	return item;
};
