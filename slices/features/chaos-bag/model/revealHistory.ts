import type { ChaosBagToken } from "./tokens";

export type ChaosBagHistoryItem = {
	id: string;
	boardId: number;
	skillCheckItemId?: string;
	tokens: ChaosBagToken[];
};
