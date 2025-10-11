import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import type { InvestigatorBoardHistoryItem } from "../../model";
import { getBoardValuePropFromHistory } from "./getBoardValuePropFromHistory";

type Options = {
	board: InvestigatorBoard;
	historyItems: InvestigatorBoardHistoryItem[];
};

export const getBoardValueFromHistory = (options: Options) => {
	const { board, historyItems } = options;

	return {
		value: getBoardValuePropFromHistory({
			historyItems,
			type: "value",
			initialValue: board.value,
		}),
		baseValue: getBoardValuePropFromHistory({
			historyItems,
			type: "baseValue",
			initialValue: board.baseValue,
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
	};
};
