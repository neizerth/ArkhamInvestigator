import type { InvestigatorSignature } from "arkham-investigator-data";
import type {
	Faction,
	InvestigatorGameStatType,
	InvestigatorMainStatType,
	InvestigatorSkillType,
} from "./common";
import type { SkillCheckHistoryItem } from "./skillCheck";

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

export type InvestigatorBoard = {
	id: number;
	signatureGroupId: string;
	skinId?: string;

	investigator: InvestigatorSignature;
	image: InvestigatorImage;
	initialValue: InvestigatorBoardValues;
	baseValue: InvestigatorBoardValues;
	value: InvestigatorBoardValues;
	history: HistoryItem[];
	historyIndex: number;
	checkHistory: SkillCheckHistoryItem[];
	currentRole?: Faction;
	usedAbilities?: UsedAbility[];
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
};

export type PickerDecelerationType = "fast" | "normal" | false;
