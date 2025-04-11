import type {
	InvestigatorAbility,
	InvestigatorImage,
	InvestigatorSignature,
} from "arkham-investigator-data";
import type {
	Faction,
	InvestigatorDetails,
	InvestigatorGameStatType,
	InvestigatorMainStatType,
	InvestigatorSkillType,
	SelectedInvestigator,
} from "./common";
import type { SkillCheckHistoryItem } from "./skillCheck";

export type InvestigatorBoardStat =
	| InvestigatorMainStatType
	| InvestigatorSkillType
	| InvestigatorGameStatType;

export type InvestigatorPicture = {
	id: string;
	image: InvestigatorImage;
};

export type InvestigatorBoardValues = Record<InvestigatorBoardStat, number> & {
	additionalAction: boolean;
};

export type InvestigatorBoard = {
	id: number;
	investigator: InvestigatorSignature;
	picture: InvestigatorPicture;
	isParallel: boolean;
	initialValue: InvestigatorBoardValues;
	baseValue: InvestigatorBoardValues;
	value: InvestigatorBoardValues;
	unique: boolean;
	history: HistoryItem[];
	historyIndex: number;
	checkHistory: SkillCheckHistoryItem[];
	details: InvestigatorDetails;
	selection: SelectedInvestigator;
	currentRole?: Faction;
	usedAbilities?: UsedAbility[];
	abilities?: InvestigatorAbility[];
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
