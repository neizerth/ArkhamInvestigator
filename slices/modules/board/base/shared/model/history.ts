import type { InvestigatorBoard, InvestigatorBoardValues } from "./board";

export type InvestigatorBoardHistoryItem = InvestigatorBoardHistoryItemData & {
	id: string;
};

export type InvestigatorBoardHistoryItemData = Pick<
	InvestigatorBoard,
	"usedAbilities" | "currentRole" | "abilityValues"
> & {
	initialValue?: Partial<InvestigatorBoardValues>;
	baseValue?: Partial<InvestigatorBoardValues>;
	value?: Partial<InvestigatorBoardValues>;
};
