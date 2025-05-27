import type { InvestigatorSignature } from "arkham-investigator-data";
import type {
	Faction,
	InvestigatorGameStatType,
	InvestigatorMainStatType,
	InvestigatorSkillType,
} from "./common";
import type { SkillCheckHistoryItem } from "./skillCheck";

export type BoardId = number | "current";

export type InvestigatorBoardStat =
	| InvestigatorMainStatType
	| InvestigatorSkillType
	| InvestigatorGameStatType;

export type InvestigatorImage = Omit<InvestigatorSignature["image"], "id"> & {
	id: string;
};

export type InvestigatorBoardValues = Record<InvestigatorBoardStat, number> & {
	additionalAction: boolean;
};

export type InvestigatorAbilityValues = Record<string, number>;

export type InvestigatorBoard = {
	id: number;
	signatureGroupId: string;
	skinId?: string;

	investigator: InvestigatorSignature;
	image: InvestigatorImage;
	initialValue: InvestigatorBoardValues;
	baseValue: InvestigatorBoardValues;
	value: InvestigatorBoardValues;
	abilityValues?: InvestigatorAbilityValues;
	history: HistoryItem[];
	historyIndex: number;
	checkHistory: SkillCheckHistoryItem[];
	currentRole?: Faction;
	usedAbilities?: UsedAbility[];
	showPinnedSkillChecks?: boolean;
};

export type UsedAbility = {
	id: string;
	boardIds?: number[];
};

export type HistoryItem = {
	id: string;
	baseValue?: Partial<InvestigatorBoardValues>;
	value?: Partial<InvestigatorBoardValues>;
	usedAbilities?: UsedAbility[];
	currentRole?: Faction;
	abilityValues?: Record<string, number>;
};

export type PickerDecelerationType = "fast" | "normal" | false;
