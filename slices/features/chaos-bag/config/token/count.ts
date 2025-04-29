import type { ChaosTokenType } from "../../model";

export const chaosTokenCount: Record<ChaosTokenType, number> = {
	"+1": 3,
	"0": 4,
	"-1": 5,
	"-2": 4,
	"-3": 3,
	"-4": 2,
	"-5": 2,
	"-6": 2,
	"-7": 1,
	"-8": 1,
	frost: 8,
	skull: 4,
	cultist: 4,
	tablet: 4,
	elderThing: 4,
	// auto-fail ultimatum
	autoFail: 2,
	elderSign: 1,
	bless: 10,
	curse: 10,
};
