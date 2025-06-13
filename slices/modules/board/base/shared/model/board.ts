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
import type { InvestigatorBoardHistoryItem } from "./history";

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
	history: InvestigatorBoardHistoryItem[];
	historyIndex: number;
	checkHistory: SkillCheckHistoryItem[];
	currentRole?: Faction;
	usedAbilities?: InvestigatorBoardUsedAbility[];
	showPinnedSkillChecks?: boolean;
};

export type PropsWithBoard = {
	boardId: BoardId;
};

export type BoardKey = keyof InvestigatorBoard;
