import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import type { InvestigatorImage } from "arkham-investigator-data";
import type { InvestigatorSource } from "../../api";
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

export type InvestigatorBoardSource = InvestigatorSource & {
	translated: (keyof ArkhamDBInvestigatorCard)[];
};

export type InvestigatorBoard = {
	id: number;
	investigator: InvestigatorBoardSource;
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
};

export type HistoryItem = {
	id: string;
	baseValue?: Partial<InvestigatorBoardValues>;
	value?: Partial<InvestigatorBoardValues>;
};

export type PickerDecelerationType = "fast" | "normal" | false;
