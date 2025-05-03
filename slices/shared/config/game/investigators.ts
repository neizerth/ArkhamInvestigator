import type {
	InvestigatorAbilityType,
	LimitType,
} from "arkham-investigator-data";

type AbilityType = InvestigatorAbilityType["type"];

export const InvesigatorCode = {
	LolaHayes: "03006",
};

export const BOARD_ABILITY_LIMITS: LimitType[] = [
	"game",
	"phase",
	"round",
	"turn",
];

export const BOARD_ABILITY_TYPES: AbilityType[] = [
	"fast",
	"reaction",
	"action",
	"special-action",
];

export const SPECIAL_ACTIONS: string[] = ["give-action"];

export const TURN_ABILITY_LIMITS: LimitType[] = ["phase", "round", "turn"];
