import type { InvestigatorSignature } from "arkham-investigator-data";
import type {
	InvestigatorGameStatType,
	InvestigatorMainStatType,
	InvestigatorSkillType,
} from "./common";

export type InvestigatorBoardNumericStat =
	| InvestigatorMainStatType
	| InvestigatorSkillType
	| InvestigatorGameStatType;

export type InvestigatorImage = Omit<InvestigatorSignature["image"], "id"> & {
	id: string;
};

export type PickerDecelerationType = "fast" | "normal" | false;
