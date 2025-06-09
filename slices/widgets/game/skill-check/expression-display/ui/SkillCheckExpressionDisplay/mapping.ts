import { characters } from "@shared/config";
import type {
	InvestigatorBoardNumericStat,
	SkillCheckOperator,
} from "@shared/model";

export const operatorMapping: Record<SkillCheckOperator, string> = {
	add: "+",
	subtract: "-",
	multiply: characters.multiply,
	divide: characters.divide,
};

export const iconMapping: Partial<
	Record<InvestigatorBoardNumericStat, string>
> = {
	resources: "resource",
};
