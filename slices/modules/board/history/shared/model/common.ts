import type {
	InvestigatorBoard,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";

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

export type ChangeHistoryPayload =
	| {
			history?: boolean;
	  }
	| {
			history: {
				id: string;
				type: "update";
			};
	  };
