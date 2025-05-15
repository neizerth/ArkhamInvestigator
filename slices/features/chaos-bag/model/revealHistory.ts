import type { InvestigatorBoardStat } from "@shared/model";
import type { ChaosBagToken } from "./tokens";

export type ChaosBagHistoryItem = {
	id: string;
	boardId: number;
	skillCheckType?: InvestigatorBoardStat | null;
	skillCheckValue?: number | null;
	tokens: ChaosBagToken[];
	date: string;
};
