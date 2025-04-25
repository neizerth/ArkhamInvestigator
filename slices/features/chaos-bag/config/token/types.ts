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

export const symbolicChaosTokenTypes = [
	"skull",
	"cultist",
	"tablet",
	"elderThing",
	"autoFail",
	"elderSign",
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

export const chaosTokenTypes = {
	bless: blessChaosTokenType,
	curse: curseChaosTokenType,
	frost: frostChaosTokenType,

	numeric: numericChaosTokenTypes,
	symbolic: symbolicChaosTokenTypes,
	special: specialChaosTokenTypes,
	base: baseChaosTokenTypes,
	all: allChaosTokenTypes,
};
