export type ChaosTokenType = BaseChaosTokenType | SpecialChaosTokenType;

export type BaseChaosTokenType = NumericChaosTokenType | SymbolicChaosTokenType;

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
	| SpecialSymbolicChaosTokenType;

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

export type ChaosBagToken = {
	id: string;
	type: ChaosTokenType;
	removable: boolean;
	sealed?: boolean;
};

export type ScenarioChaosTokenValues = Partial<Record<ChaosTokenType, number>>;
