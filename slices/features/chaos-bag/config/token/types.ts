import type { ChaosTokenType } from "../../model";

export const numericChaosTokenTypes = [
	"+1",
	"0",
	"-1",
	"-2",
	"-3",
	"-4",
	"-5",
	"-6",
	"-7",
	"-8",
] as const;

export const baseSymbolicChaosTokenTypes = [
	"skull",
	"cultist",
	"tablet",
	"elderThing",
] as const;

export const specialSymbolicChaosTokenTypes = [
	"elderSign",
	"autoFail",
] as const;

export const symbolicChaosTokenTypes = [
	...baseSymbolicChaosTokenTypes,
	...specialSymbolicChaosTokenTypes,
] as const;

export const specialChaosTokenTypes = ["frost", "bless", "curse"] as const;

export const baseChaosTokenTypes = [
	...numericChaosTokenTypes,
	...symbolicChaosTokenTypes,
] as const;

export const allChaosTokenTypes = [
	...baseChaosTokenTypes,
	...specialChaosTokenTypes,
] as const;

export const blessChaosTokenType = "bless" as const;

export const curseChaosTokenType = "curse" as const;

export const frostChaosTokenType = "frost" as const;

export const regulatChaosTokenTypes = [
	...baseChaosTokenTypes,
	frostChaosTokenType,
] as const;

export const chaosTokenOrder = allChaosTokenTypes.reduce(
	(target, type, index) => {
		target[type] = index;
		return target;
	},
	{} as Record<ChaosTokenType, number>,
);

export const chaosTokenTypes = {
	bless: blessChaosTokenType,
	curse: curseChaosTokenType,
	frost: frostChaosTokenType,

	numeric: numericChaosTokenTypes,
	symbolic: {
		base: baseSymbolicChaosTokenTypes,
		special: specialSymbolicChaosTokenTypes,
		all: symbolicChaosTokenTypes,
	},
	special: specialChaosTokenTypes,
	base: baseChaosTokenTypes,
	regular: regulatChaosTokenTypes,
	all: allChaosTokenTypes,
	order: chaosTokenOrder,
};
