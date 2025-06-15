import type {
	InvestigatorBoard,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import type { InvestigatorBoardHistoryItem } from "../../shared/model";
import { getBoardValuePropFromHistory } from "./getBoardValuePropFromHistory";

type Options = {
	board: InvestigatorBoard;
	historyItems: InvestigatorBoardHistoryItem[];
};

export const getBoardValueFromHistory = (options: Options) => {
	const getValue = <K extends Key>(type: K) =>
		getBoardValuePropFromHistory({
			...options,
			type,
		});

	return {
		value: getValue("value"),
		baseValue: getValue("baseValue"),
		initialValue: getValue("initialValue"),
	};
};
