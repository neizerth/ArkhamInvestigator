import type {
	InvestigatorAbilityType,
	LimitType,
} from "arkham-investigator-data";

type AbilityType = InvestigatorAbilityType["type"];

export const BOARD_ABILITY_LIMITS: LimitType[] = [
	"game",
	"phase",
	"round",
	"turn",
];

export const PERMANENT_BOARD_ABILITY_TYPES: AbilityType[] = [
	"counter",
	"permanent",
];

export const TURN_ABILITY_LIMITS: LimitType[] = ["phase", "round", "turn"];

export const additionalActionAbilityId = "additionalAction";
