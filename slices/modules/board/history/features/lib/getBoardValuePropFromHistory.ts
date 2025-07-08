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
	type: K;
	historyItems: InvestigatorBoardHistoryItem[];
	initialValue: InvestigatorBoard[K];
};
export const getBoardValuePropFromHistory = <K extends Key>({
	type,
	historyItems,
	initialValue,
}: Options<K>) => {
	const patches = historyItems.map(prop(type));

	const patch: Patch = Object.assign({}, ...patches);

	const value: InvestigatorBoard[K] = {
		...initialValue,
		...patch,
	};

	return value;
};
