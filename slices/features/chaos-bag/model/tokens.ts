import type {
	allChaosTokenTypes,
	baseSymbolicChaosTokenTypes,
	blessChaosTokenType,
	curseChaosTokenType,
	frostChaosTokenType,
	numericChaosTokenTypes,
	specialChaosTokenTypes,
	specialSymbolicChaosTokenTypes,
	symbolicChaosTokenTypes,
} from "../config/token/types";

export type ChaosTokenType =
	| BaseChaosTokenType
	| SpecialChaosTokenType
	| SpecialChaosTokenType;

export type BaseChaosTokenType = (typeof allChaosTokenTypes)[number];

export type NumericChaosTokenType = (typeof numericChaosTokenTypes)[number];

export type SymbolicChaosTokenType = (typeof symbolicChaosTokenTypes)[number];

export type BaseSymbolicChaosTokenType =
	(typeof baseSymbolicChaosTokenTypes)[number];

export type SpecialSymbolicChaosTokenType =
	(typeof specialSymbolicChaosTokenTypes)[number];

export type SpecialChaosTokenType = (typeof specialChaosTokenTypes)[number];

export type FrostTokenType = typeof frostChaosTokenType;

export type BlessCurseChaosTokenType =
	| typeof blessChaosTokenType
	| typeof curseChaosTokenType;

export type ChaosTokensCount = Partial<Record<ChaosTokenType, number>>;

export type ChaosBagToken = {
	id: string;
	type: ChaosTokenType;
	sealed?: boolean;
};
