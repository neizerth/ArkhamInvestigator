import type {
	InvestigatorBoard,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";

export type InvestigatorBoardHistoryItem = InvestigatorBoardHistoryItemData & {
	id: string;
};

export type InvestigatorBoardHistoryItemData = Pick<
	InvestigatorBoard,
	"usedAbilities" | "faction" | "abilityValues"
> & {
	initialValue?: Partial<InvestigatorBoardValues>;
	baseValue?: Partial<InvestigatorBoardValues>;
	value?: Partial<InvestigatorBoardValues>;
};

export type ChangeHistoryItem =
	| {
			type: ChangeHistoryType;
			id: string;
	  }
	| false;

export type ChangeHistoryPayload = {
	history?: ChangeHistoryItem;
};

export type ChangeHistoryType = "group" | "update" | "replace";
