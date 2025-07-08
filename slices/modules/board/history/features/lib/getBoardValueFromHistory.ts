import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { isNotEmpty, last, prop } from "ramda";
import type { InvestigatorBoardHistoryItem } from "../../shared/model";
import { getBoardValuePropFromHistory } from "./getBoardValuePropFromHistory";

type Options = {
	board: InvestigatorBoard;
	historyItems: InvestigatorBoardHistoryItem[];
};

export const getBoardValueFromHistory = (options: Options) => {
	const { board, historyItems } = options;

	const nonEmptyAbilities = historyItems.map(prop("usedAbilities"));
	const usedAbilities = last(nonEmptyAbilities.filter(isNotEmpty));

	return {
		value: getBoardValuePropFromHistory({
			historyItems,
			type: "value",
			initialValue: board.initialValue,
		}),
		baseValue: getBoardValuePropFromHistory({
			historyItems,
			type: "baseValue",
			initialValue: board.initialValue,
		}),
		initialValue: getBoardValuePropFromHistory({
			historyItems,
			type: "initialValue",
			initialValue: board.initialValue,
		}),
		abilityValues: getBoardValuePropFromHistory({
			historyItems,
			type: "abilityValues",
			initialValue: board.abilityValues,
		}),
		usedAbilities,
	};
};
