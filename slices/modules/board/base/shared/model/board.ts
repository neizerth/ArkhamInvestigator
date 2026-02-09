import type { Box, InvestigatorSignature } from "arkham-investigator-data";

import type {
	InvestigatorAbilityValues,
	InvestigatorBoardUsedAbility,
} from "@modules/board/abilities/shared/model";
import type {
	ChangeHistoryPayload,
	InvestigatorBoardHistoryItem,
} from "@modules/board/history/shared/model";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import type { Faction, InvestigatorNumericStat } from "@shared/model";

export type BoardId = number | "current";

export type InvestigatorBoardValueProp = "value" | "baseValue" | "initialValue";

export type InvestigatorBoardImage = InvestigatorSignature["image"];

export type InvestigatorBoardValues = Record<InvestigatorNumericStat, number>;

export type InvestigatorBoardBackground = {
	color: string;
	grayscale: string;
};

export type InvestigatorBoard = {
	id: number;
	networkId?: string;
	loaded?: boolean;
	loadProgress?: number;

	index: number;
	signatureGroupId: string;
	skinId?: string;
	turnId?: string;

	investigator: InvestigatorSignature;
	image: InvestigatorBoardImage;
	initialValue: InvestigatorBoardValues;
	baseValue: InvestigatorBoardValues;
	value: InvestigatorBoardValues;
	abilityValues?: InvestigatorAbilityValues;
	history: InvestigatorBoardHistoryItem[];
	historyIndex: number;
	checkHistory: SkillCheckHistoryItem[];
	faction?: Faction;
	usedAbilities?: InvestigatorBoardUsedAbility[];
	initialUsedAbilities?: InvestigatorBoardUsedAbility[];
	showPinnedSkillChecks?: boolean;

	background?: InvestigatorBoardBackground | null;
	gameTextSize?: Box | null;
};

export type InvesigatorBoardPartial = Omit<
	Partial<InvestigatorBoard>,
	InvestigatorBoardValueProp
> &
	Partial<Record<InvestigatorBoardValueProp, Partial<InvestigatorBoardValues>>>;

export type PropsWithBoardId = {
	boardId: BoardId;
};

export type PropsWithBoard = {
	board: InvestigatorBoard;
};

export type PropsWithSourceBoard = {
	sourceBoardId: BoardId;
};

export type BoardKey = keyof InvestigatorBoard;

export type ChangeBoardEventPayload = PropsWithBoardId &
	Partial<PropsWithSourceBoard> &
	ChangeHistoryPayload;
