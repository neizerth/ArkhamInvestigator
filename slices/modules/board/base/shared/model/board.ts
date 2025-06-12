import type { InvestigatorSignature } from "arkham-investigator-data";

import type {
	InvestigatorAbilityValues,
	InvestigatorBoardUsedAbility,
} from "@modules/board/abilities/shared/model";
import type {
	Faction,
	InvestigatorNumericStat,
	SkillCheckHistoryItem,
} from "@shared/model";

export type BoardId = number | "current";

export type InvestigatorBoardStat =
	| InvestigatorNumericStat
	| "additionalAction";

export type InvestigatorBoardValueProp = "value" | "baseValue" | "initialValue";

export type InvestigatorBoardImage = Omit<
	InvestigatorSignature["image"],
	"id"
> & {
	id: string;
};

export type InvestigatorBoardValues = Record<
	InvestigatorNumericStat,
	number
> & {
	additionalAction: boolean;
};

export type InvestigatorBoard = {
	id: number;
	index: number;
	signatureGroupId: string;
	skinId?: string;

	investigator: InvestigatorSignature;
	image: InvestigatorBoardImage;
	initialValue: InvestigatorBoardValues;
	baseValue: InvestigatorBoardValues;
	value: InvestigatorBoardValues;
	abilityValues?: InvestigatorAbilityValues;
	history: BoardHistoryItem[];
	historyIndex: number;
	checkHistory: SkillCheckHistoryItem[];
	currentRole?: Faction;
	usedAbilities?: InvestigatorBoardUsedAbility[];
	showPinnedSkillChecks?: boolean;
};

export type BoardHistoryItem = {
	id: string;
	initialValue?: Partial<InvestigatorBoardValues>;
	baseValue?: Partial<InvestigatorBoardValues>;
	value?: Partial<InvestigatorBoardValues>;
	usedAbilities?: InvestigatorBoardUsedAbility[];
	currentRole?: Faction;
	abilityValues?: Record<string, number>;
};

export type PropsWithBoard = {
	boardId: BoardId;
};

export type BoardKey = keyof InvestigatorBoard;
