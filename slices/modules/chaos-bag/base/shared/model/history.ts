import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";
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
