import type {
	InvestigatorAbilityType,
	LimitType,
} from "arkham-investigator-data";

type AbilityType = InvestigatorAbilityType["type"];

// Carson Sinclair personal ability
export const GIVE_ACTION_ABILITY = "give-action" as const;
// Minh Thi Phan personal ability
export const ADD_2WILD_ABILITY = "add-2wild" as const;

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

export const SPECIAL_ABILITIES: string[] = [
	GIVE_ACTION_ABILITY,
	ADD_2WILD_ABILITY,
];

export const TURN_ABILITY_LIMITS: LimitType[] = ["phase", "round", "turn"];
