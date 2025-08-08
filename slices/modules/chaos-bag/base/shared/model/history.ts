import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";

export type ChaosBagHistoryItemData = {
	boardId: number;
	title?: string | null;
	skillCheckType?: InvestigatorBoardNumericStat | null;
	skillCheckValue?: number | null;
	skillCheckExpression?: SkillCheckItem[];
	difficulty?: number;
	result?: ChaosTokenValue;
	succeedBy?: number;
	tokens: RevealedChaosBagToken[];
	date: string;
};

export type ChaosBagHistoryItem = ChaosBagHistoryItemData & {
	id: string;
};
