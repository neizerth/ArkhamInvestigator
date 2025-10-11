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

export type ChangeHistoryPayload = {
	history?:
		| {
				type: "update" | "replace" | "group";
				id: string;
		  }
		| false;
};

export type ChangeHistoryType = "group" | "update" | "replace";
