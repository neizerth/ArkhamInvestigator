import type {
	blessChaosTokenType,
	curseChaosTokenType,
	frostChaosTokenType,
	numericChaosTokenTypes,
	specialChaosTokenTypes,
	symbolicChaosTokenTypes,
} from "../config/token/types";

export type ChaosTokenType = BaseChaosTokenType | SpecialChaosTokenType;

export type BaseChaosTokenType = NumericChaosTokenType | SymbolicChaosTokenType;

export type NumericChaosTokenType = (typeof numericChaosTokenTypes)[number];

export type SymbolicChaosTokenType = (typeof symbolicChaosTokenTypes)[number];

export type SpecialChaosTokenType = (typeof specialChaosTokenTypes)[number];

export type FrostTokenType = typeof frostChaosTokenType;

export type BlessCurseChaosTokenType =
	| typeof blessChaosTokenType
	| typeof curseChaosTokenType;

export type ChaosTokensCount = Partial<Record<ChaosTokenType, number>>;
