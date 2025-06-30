import type { ChaosTokenType, SymbolicChaosTokenType } from "../../model";
import { numericChaosTokenTypes } from "./types";

export const numericChaosTokenCharacters = numericChaosTokenTypes.reduce(
	(acc, type) => {
		acc[type] = `“${type}”`;
		return acc;
	},
	{} as Record<ChaosTokenType, string>,
);

export const symbolicChaosTokenCharacters: Record<
	SymbolicChaosTokenType,
	string
> = {
	elderSign: "[elder_sign]",
	autoFail: "[auto_fail]",
	elderThing: "[elder_thing]",
	tablet: "[tablet]",
	skull: "[skull]",
	cultist: "[cultist]",
	bless: "[bless]",
	curse: "[curse]",
	frost: "[frost]",
};

export const chaosTokenCharacters: Record<ChaosTokenType, string> = {
	...symbolicChaosTokenCharacters,
	...numericChaosTokenCharacters,
};
