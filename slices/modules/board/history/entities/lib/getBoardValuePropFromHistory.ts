import type {
	InvestigatorBoard,
	InvestigatorBoardValues,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import { prop } from "ramda";
import type { InvestigatorBoardHistoryItem } from "../../shared/model";

type Patch = Partial<InvestigatorBoardValues>;

type Options<K extends Key> = {
	board: InvestigatorBoard;
	type: K;
	historyItems: InvestigatorBoardHistoryItem[];
};
export const getBoardValuePropFromHistory = <K extends Key>({
	board,
	type,
	historyItems,
}: Options<K>) => {
	const patches = historyItems.map(prop(type));

	const patch: Patch = Object.assign({}, ...patches);

	const value: InvestigatorBoardValues = {
		...board[type],
		...patch,
	};

	return value;
};
