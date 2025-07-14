export type ChaosTokenType = BaseChaosTokenType | SpecialChaosTokenType;

export type BaseChaosTokenType =
	| NumericChaosTokenType
	| BaseSymbolicChaosTokenType
	| SpecialSymbolicChaosTokenType;

export type NumericChaosTokenType =
	| "+1"
	| "0"
	| "-1"
	| "-2"
	| "-3"
	| "-4"
	| "-5"
	| "-6"
	| "-7"
	| "-8";

export type SymbolicChaosTokenType =
	| BaseSymbolicChaosTokenType
	| SpecialSymbolicChaosTokenType
	| SpecialChaosTokenType;

export type BaseSymbolicChaosTokenType =
	| "skull"
	| "cultist"
	| "tablet"
	| "elderThing";

export type SpecialSymbolicChaosTokenType = "elderSign" | "autoFail";

export type SpecialChaosTokenType = BlessCurseChaosTokenType | FrostTokenType;

export type FrostTokenType = "frost";

export type BlessCurseChaosTokenType = "bless" | "curse";

export type ChaosTokenCount = Partial<Record<ChaosTokenType, number>>;

export type ChaosBagTokenData = {
	type: ChaosTokenType;
	sealed?: boolean;
};

export type ChaosBagToken = ChaosBagTokenData & {
	id: string;
};

export type ChaosTokenValues = Partial<Record<ChaosTokenType, number>>;
