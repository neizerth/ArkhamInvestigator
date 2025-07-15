import type { NumericChaosTokenType } from "@modules/chaos-bag/base/shared/model";

export const defaultChaosTokenValues = {
	frost: -1,
	bless: 2,
	curse: -2,
};

export const defaultNumericChaosTokenValue: Record<
	NumericChaosTokenType,
	number
> = {
	"+1": 1,
	"-1": -1,
	"-2": -2,
	"-3": -3,
	"-4": 4,
	"-5": -5,
	"-6": 6,
	"-7": -7,
	"-8": -8,
	"0": 0,
};
