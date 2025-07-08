import type {
	InvestigatorBoard,
	InvestigatorBoardValueProp,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { prop } from "ramda";
import type { InvestigatorBoardHistoryItem } from "../../shared/model";

export type GetBoardValuePropFromHistoryProp =
	| InvestigatorBoardValueProp
	| "abilityValues";

type Key = GetBoardValuePropFromHistoryProp;

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

	const value: InvestigatorBoard[K] = {
		...board.initialValue,
		...patch,
	};

	return value;
};
