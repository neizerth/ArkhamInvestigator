import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
} from "@shared/model";
import type { ChaosBagToken } from "./tokens";

export type ChaosBagHistoryItem = {
	id: string;
	boardId: number;
	title?: string | null;
	skillCheckType?: InvestigatorBoardNumericStat | null;
	skillCheckValue?: number | null;
	skillCheckExpression?: SkillCheckItem[];
	tokens: ChaosBagToken[];
	date: string;
};
