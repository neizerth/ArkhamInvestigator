import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { pick } from "ramda";
import type { InvestigatorBoardHistoryItem } from "../../model";
import { getBoardValueFromHistory } from "./getBoardValueFromHistory";
import { getHistoryItemProp } from "./getHistoryItemProp";

type Options = {
	cleanBoard: InvestigatorBoard;
	board: InvestigatorBoard;
	history: InvestigatorBoardHistoryItem[];
	historyIndex: number;
};

export const getBoardFromHistory = (options: Options): InvestigatorBoard => {
	const { board, history, historyIndex, cleanBoard } = options;

	if (historyIndex === -1) {
		const props = pick(["loadProgress", "loaded", "background"], board);
		return {
			...cleanBoard,
			...props,
			history,
		};
	}

	const usedAbilities = getHistoryItemProp({
		history,
		defaultValue: cleanBoard.initialUsedAbilities ?? [],
		prop: "usedAbilities",
		historyIndex,
	});

	const faction = getHistoryItemProp({
		history,
		defaultValue: board.investigator.faction_code,
		prop: "faction",
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
