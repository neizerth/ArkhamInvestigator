import type { ChaosTokenType } from "../../model";

export const numericChaosTokenTypes: ChaosTokenType[] = [
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
];

export const baseSymbolicChaosTokenTypes: ChaosTokenType[] = [
	"skull",
	"cultist",
	"tablet",
	"elderThing",
];

export const specialSymbolicChaosTokenTypes: ChaosTokenType[] = [
	"elderSign",
	"autoFail",
];

export const symbolicChaosTokenTypes = [
	...baseSymbolicChaosTokenTypes,
	...specialSymbolicChaosTokenTypes,
];

export const specialChaosTokenTypes: ChaosTokenType[] = [
	"frost",
	"bless",
	"curse",
];

export const baseChaosTokenTypes = [
	...numericChaosTokenTypes,
	...symbolicChaosTokenTypes,
];

export const allChaosTokenTypes = [
	...baseChaosTokenTypes,
	...specialChaosTokenTypes,
];

export const blessChaosTokenType: ChaosTokenType = "bless";

export const curseChaosTokenType: ChaosTokenType = "curse";

export const frostChaosTokenType: ChaosTokenType = "frost";

export const regulatChaosTokenTypes: ChaosTokenType[] = [
	...baseChaosTokenTypes,
	frostChaosTokenType,
];

export const removableChaosTokenTypes: ChaosTokenType[] = [
	blessChaosTokenType,
	curseChaosTokenType,
];

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
	removable: removableChaosTokenTypes,
};
