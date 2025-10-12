import type { BoardKey } from "@modules/board/base/shared/model";

export const supportedInvestigatorBoardHistoryProps: BoardKey[] = [
	"initialValue",
	"baseValue",
	"value",
	"usedAbilities",
	"abilityValues",
	"faction",
];

export const boardHistoryPrefix = "boardHistory";
