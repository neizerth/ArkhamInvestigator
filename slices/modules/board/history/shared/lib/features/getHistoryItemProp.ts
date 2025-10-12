import type { Defined } from "@shared/model";
import type { InvestigatorBoardHistoryItem } from "../../model";

type Key = keyof InvestigatorBoardHistoryItem;

type Options<T extends Key> = {
	history: InvestigatorBoardHistoryItem[];
	prop: T;
	defaultValue: Defined<InvestigatorBoardHistoryItem[T]>;
	historyIndex: number;
};

export function getHistoryItemProp<T extends Key>(options: Options<T>) {
	const { history, defaultValue, historyIndex, prop } = options;

	if (historyIndex === -1) {
		return defaultValue;
	}

	for (let i = historyIndex; i >= 0; i--) {
		const item = history[i];
		if (item[prop]) {
			return item[prop];
		}
	}

	return defaultValue;
}
