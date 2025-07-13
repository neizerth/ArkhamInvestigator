import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
} from "@shared/model";

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
